import { Button, Col, Descriptions, Divider, Form, InputNumber, Switch, Input, notification, Radio, Row, Table, Popconfirm, Modal } from 'antd';
import queryString from 'query-string';
import React, { useRef, useState, useEffect, useContext, useLayoutEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import PatientDetails from '../patientDetails';
import AddItem from './components/addItemModal';
import { BillPrint } from './components/billPrint';
import FinalCharges from './components/finalCharges';
import useSaveGenerateBill from '../../state/billing/hooks/useGenerateBill';
import { getPatientById } from '../../state/patientSearch/queries';
import { getBillDetails } from './services';
import ReturnItem from './components/returnItemModal';
import { saveGenerateBill } from '../../state/billing/queries';
import { SERVER_ERROR } from '../../utils/constantMessages';

const EditableContext = React.createContext();
const { Search } = Input;
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
  }

  return <td {...restProps}>{childNode}</td>;
};
const Billing = ({ location, history }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const queryParams = queryString.parse(location.search);
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  let columns = [
    {
      title: 'Item Name',
      dataIndex: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      editable: "true",
      width: '10%',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      editable: "true",
      sorter: {
        compare: (a, b) => a.amount - b.amount,
        multiple: 3,
      },
    },
    {
      title: 'GST(CGST+SGST)',
      dataIndex: 'gst',
      editable: "true",
      width: '10%',
      sorter: {
        compare: (a, b) => a.gst - b.gst,
        multiple: 3,
      },
    },
    {
      title: 'Discount(%)',
      dataIndex: 'discount',
      editable: "true",
      width: '10%',
      sorter: {
        compare: (a, b) => a.discount - b.discount,
        multiple: 2,
      },
    },
    {
      title: 'Total',
      dataIndex: 'total',
      sorter: {
        compare: (a, b) => a.total - b.total,
        multiple: 1,
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) =>
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
          <a> {queryParams.context != "edit" ? "Delete" : ""} </a>
        </Popconfirm>
    }
  ];
  columns = columns.map((col) => {
    if (col.editable == "false") {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });
  function handleSave(row) {
    const newData = [...data];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    const finalCharges = getFinalCharges([row]);
    row.total = (finalCharges.discountedAmount + finalCharges.totalGST).toFixed(2);
    newData.splice(index, 1, { ...item, ...row });
    setData(newData);
    calculateTotalCharges(newData);
  };

  const defaultbillDetails = {
    billId: '',
    createdAt: (new Date()).toDateString() + ' ' + (new Date()).toLocaleTimeString()
  };

  const defaultFinalCharges = {
    totalAmount: 0,
    totalDiscount: 0,
    totalGST: 0
  };

  const printBillButton = <Col className="gutter-row"  span={6}>
    <Button style={{ width: '90%' }} type="primary" onClick={handlePrint}>Print</Button>
  </Col>;
  let generateBillButton = <Col className="gutter-row" span={6}>
    <Button style={{ width: '90%' }} type="primary" onClick={generateBill}>Generate {queryParams.context == "edit" ? "new " : ""}bill</Button>
  </Col>;
  let printButton = "";
  const [newPatientForm] = Form.useForm();
  const [state, setState] = useState("initial");
  const [paymentMode, setPaymentMode] = useState("Cash");
  // const [billResponse, isLoading, setBillSearch] = useBillSearch();
  const [patientDetails, setPatientDetails] = useState({});
  const [newPatientSwitch, setNewPatientSwitch] = useState(false);
  const [generateBillStatus, setGenerateBillStatus] = useSaveGenerateBill();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReturnModalVisible, setIsReturnModalVisible] = useState(false);
  const [billDetails, setBillDetails] = useState(defaultbillDetails);
  const [finalCharges, setFinalCharges] = useState(defaultFinalCharges);
  const [data, setData] = useState([]);;

  let patientInfo = <div>
    <Search placeholder="Search by Patient Id" allowClear onSearch={patientSearch} style={{ width: '30%' }} />
    <PatientDetails searchType="patientId" patientDetails={patientDetails} />
  </div>;
  // let billSearchComp = <BillSearch onSearch={onBillSearch} />;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showReturnItemModal = () => {
    setIsReturnModalVisible(true);
  };


  const handleOk = () => {
    setIsModalVisible(false);
  };

  const submitReturn = () => {
    setIsReturnModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const cancelReturnModal = () => {
    setIsReturnModalVisible(false);
  };
  useEffect(() => {
    // calculateTotalCharges(mockData);
    // setData(mockData);
    if (queryParams.context == 'registration') {
      const tempData = [
        {
          key: '1',
          name: 'Registration',
          quantity: 1,
          type: 'registration',
          amount: 500,
          gst: 0,
          discount: 0,
          total: 500,
        }];
      setData(tempData);
      calculateTotalCharges(tempData);
      patientSearch(queryParams.patientId);
    } else if (queryParams.context == 'consulation') {
      const tempData = [
        {
          key: '1',
          name: 'Consultation ' + '(' + (queryParams.doctorName) + ')',
          quantity: 1,
          type: 'consultation',
          amount: queryParams.charges,
          gst: 0,
          discount: 0,
          total: Number(queryParams.charges) + 0,
        }];
      setData(tempData);
      calculateTotalCharges(tempData);
      patientSearch(queryParams.patientId);
    } else if (queryParams.context == 'edit') {
      onBillSearch(queryParams.billId, "billId");
    }
  }, []);
  if (state == "billGenerated") {
    generateBillButton = "";
    printButton = printBillButton;
  }

  if (queryParams.context == "edit") {
    printButton = printBillButton;
  }
  if (newPatientSwitch) {
    patientInfo = <div>
      <Divider>Patient Details</Divider>
      <Form layout="inline" form={newPatientForm}>
        <Form.Item name="patientName" label="Name">
          <Input placeholder="name" />
        </Form.Item>
        <Form.Item name="age" label="Age">
          <InputNumber placeholder="age" />
        </Form.Item>
        <Form.Item name="contact" label="Contact">
          <Input placeholder="phone number" />
        </Form.Item>
        <Form.Item name="referal doctor" label="Referal doctor">
          <Input placeholder="doctor name" />
        </Form.Item>
      </Form>
    </div>;
  }
  function getFinalCharges(dataList) {
    const finalCharges = {
      totalAmount: 0,
      totalGST: 0,
      totalDiscount: 0,
      discountedAmount: 0
    }

    dataList.forEach(data => {
      const amount = Number.parseInt(data.amount) * Number.parseInt(data.quantity);
      const discountedAmount = Number.parseInt(amount) - ((Number.parseInt(data.discount) / 100) * Number.parseInt(amount));
      finalCharges.totalAmount += Number.parseInt(amount);
      finalCharges.totalDiscount += Number.parseInt(data.discount);
      finalCharges.discountedAmount += discountedAmount;
      finalCharges.totalGST += Number.parseInt(data.gst);
    });
    return finalCharges;
  }
  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  function onBillSearch(searchValue, searchFilter) {
    getBillDetails(searchValue, searchFilter).then(data => {
      if (data && data[0]) {
        const billDetails = data[0];
        setBillDetails({
          billId: billDetails.billId,
          createdAt: (new Date(billDetails.createdAt)).toDateString()
        });
        setPaymentMode(billDetails.paymentMode);
        if (billDetails["patientId"]) {
          patientSearch(billDetails.patientId);
        } else {
          setPatientDetails({ patientId: null, patientName: billDetails.name, age: billDetails.age, gender: billDetails.gender, visitType: "General" });
        }
        if (billDetails["billDetailList"]) {

          const tempData = billDetails["billDetailList"].map((item, index) => {
            return {
              key: item.itemName + index,
              id: item.id,
              itemId: item.itemId,
              name: item.itemName,
              type: item.purchaseType,
              billMapId: item.billMapId,
              quantity: item.quantity,
              amount: item.mrp,
              gst: 0,
              discount: item.concessionPercentage,
              total: (Number(item.mrp) - ((Number(item.concessionPercentage) / 100) * Number(item.mrp))) * item.quantity,
            }
          });

          setData(tempData);
          calculateTotalCharges(tempData);
        }
      }

    });
  }

  function patientSearch(patientId) {
    getPatientById(patientId).then(patientDetails => {
      setPatientDetails(patientDetails);
    }).catch(() => {
      notification["error"]({
        message: 'Error',
        description: 'Error while searching patient with Id' + patientId,
        duration: 3
      });
    });
  }
  function onItemAdded(itemFormValue) {
    console.log(itemFormValue);
    const newData = {
      key: Math.random(),
      name: itemFormValue.name,
      itemId: itemFormValue.itemId,
      quantity: itemFormValue.quantity,
      amount: itemFormValue.amount,
      type: itemFormValue.itemType,
      gst: 0,
      discount: 0,
      total: itemFormValue.quantity * itemFormValue.amount,
    }
    const tempDataList = [...data, newData];

    setData(tempDataList);
    calculateTotalCharges(tempDataList);
    setIsModalVisible(false);
  }
  function handleDelete(key) {
    const dataSource = data.filter((item) => item.key !== key);
    calculateTotalCharges(dataSource);
    setData(dataSource);
  };

  function calculateTotalCharges(tempDataList) {
    const finalCharges = getFinalCharges(tempDataList);
    console.log(finalCharges);
    setFinalCharges({
      totalAmount: (finalCharges.discountedAmount + finalCharges.totalGST).toFixed(2),
      totalDiscount: ((finalCharges.totalAmount - finalCharges.discountedAmount) / finalCharges.totalAmount * 100).toFixed(2),
      totalGST: (finalCharges.totalGST).toFixed(2)
    });
  }

  function onDiscountChange(discountValue) {
    console.log("Discount changed", discountValue);
    let tempData = [];
    tempData = data.map(item => {
      return {
        ...item,
        discount: discountValue
      }
    });
    calculateTotalCharges(tempData);
    setData(tempData);
  }

  function paymentMethod(e) {
    setPaymentMode(e.target.value);
  }

  function generateBill() {
    const body = {
      billId: (billDetails.billId),
      billType: "PHARMACY",
      createdAt: new Date(),
      paymentStatus: (paymentMode == "Due" ? "dues" : "paid"),
      paymentMode: paymentMode,
      patientId: patientDetails.patientId,
      name: patientDetails.name,
      age: patientDetails.age,
      gender: patientDetails.gender,
      totalCost: finalCharges.totalAmount,
      totalDiscount: finalCharges.totalDiscount,
      totalGST: finalCharges.totalGST,
      billDetailList: []
    };
    data.forEach(item => {
      const billItem = {
        id: null,
        itemName: item.name,
        itemId: item.itemId,
        billMapId: null,
        cost: item.total,
        concessionPercentage: item.discount,
        gstPercentage: item.gst,
        mrp: item.amount,
        concessionType: "discount",
        quantity: item.quantity,
        purchaseType: (item.type == "medicine" ? "pharmacy-purchase" : item.type)
      };
      body.billDetailList.push(billItem);
    });
    console.log("body", body);
    if (newPatientSwitch) {
      const newPatientFormValues = newPatientForm.getFieldsValue();
      body.name = newPatientFormValues.patientName;
      body.age = newPatientFormValues.age;
      body.patientId = null;
      setPatientDetails({
        patientName: newPatientFormValues.patientName,
        patientId: "N/A",
        age: newPatientFormValues.age,
      });
    }
    saveGenerateBill(body).then(generateBillStatus => {
      if (generateBillStatus.response == "success") {
        notification["success"]({
          message: 'SUCCESS',
          description: 'Bill Generated Successfully with id ' + generateBillStatus.billId,
          duration: 3
        });
        setBillDetails({
          billId: generateBillStatus.billId,
          createdAt: (new Date()).toDateString()
        });
        setState("billGenerated");

      }
    }).catch(err => {
      notification["error"]({
        message: 'Error',
        description: SERVER_ERROR,
        duration: 3
      });

    });

  }
  function onNewPatientSwitchChange(checked) {
    setNewPatientSwitch(checked);
  }

  function onItemsReturned(returnedRows) {
    let tempData = [...data];
    let itemKeysToRemove = [];
    data.forEach((mainRow, mainIndex) => {
      returnedRows.forEach(returnedRow => {
        if (returnedRow.key == mainRow.key) {
          if (mainRow.quantity == returnedRow.quantity) {
            console.log("remove", tempData[mainIndex]);
            itemKeysToRemove.push(mainRow.key);

          } else {
            mainRow.quantity = mainRow.quantity - returnedRow.quantity;
            console.log("edit", tempData[mainIndex]);
            console.log("with", mainRow);
            tempData.splice(mainIndex, 1, { ...tempData, ...mainRow });
          }
        }
      });
    });
    tempData = tempData.filter(item => !itemKeysToRemove.includes(item.key));

    setData(tempData);
    calculateTotalCharges(tempData);
  }
  return (
    <>
      <Modal title="Add Item" visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
        <AddItem onItemAdded={onItemAdded} />
      </Modal>
      <Modal title="Return Item" visible={isReturnModalVisible} footer={null} onOk={submitReturn} onCancel={cancelReturnModal}>
        <ReturnItem rowsData={data} patientDetails={patientDetails} onItemAdded={onItemAdded} onItemsReturned={onItemsReturned} isModalVisible={setIsReturnModalVisible} />
      </Modal>
      New Patient <Switch onChange={onNewPatientSwitchChange} /> <br /> <br />
      {patientInfo}
      <div style={{ display: 'none' }}>
        <BillPrint ref={componentRef} itemList={data} paymentMode={paymentMode} finalCharges={finalCharges} patientDetails={patientDetails} billId={billDetails.billId} patientId={patientDetails.patientId} />
      </div>
      <Divider>Bill Details</Divider>
      <Descriptions>
        <Descriptions.Item label="Bill Id">{billDetails.billId}</Descriptions.Item>
        {/* <Descriptions.Item label="Receipt Id">{queryParams.receiptId}</Descriptions.Item> */}
        <Descriptions.Item label="Date and time">{billDetails.createdAt}</Descriptions.Item>
      </Descriptions>
      <Button
        onClick={showModal}
        type="primary"
        style={{
          marginBottom: 16,
          display: (queryParams.context == "edit" ? "none" : "")
        }}>Add Item
        </Button>
      <Button
        onClick={showReturnItemModal}
        type="primary"
        style={{
          marginBottom: 16,
          display: (queryParams.context == "edit" ? "" : "none")
        }}>Return Item
        </Button>
      <Table columns={columns} components={components} dataSource={data} onChange={onChange} rowClassName={() => 'editable-row'} />

      <FinalCharges finalCharges={finalCharges} onDiscountChange={onDiscountChange} />
      <Divider>Payment</Divider>
      <Radio.Group onChange={paymentMethod} value={paymentMode}>
        <Radio value="Cash">Cash</Radio>
        <Radio value="Card">Card</Radio>
        <Radio value="UPI">UPI</Radio>
        <Radio value="Paytm">Paytm</Radio>
        <Radio value="Due">Due</Radio>
      </Radio.Group>
      <br /><br /><br />
      <Row gutter={24}>
        {generateBillButton}
        {/* <Col className="gutter-row" span={3}>
          <Button type="primary">Cancel</Button>
        </Col> */}
        {printButton}

        <Col className="gutter-row" span={6}>
          <Button style={{ width: '100%' }} type="primary" onClick={() => history.push({ pathname: '/home/appointment', search: '?patientId='.concat(queryParams.patientId) })}>Go To Appointment</Button>
        </Col>
      </Row>
    </>
  );
};

export default Billing;