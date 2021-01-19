import { Button, Col, Descriptions, Divider, Form, Input, InputNumber, notification, Radio, Row, Select, Table, Popconfirm, Modal } from 'antd';
import queryString from 'query-string';
import React, { useRef, useState, useEffect, useContext } from 'react';
import { useReactToPrint } from 'react-to-print';
import useBillSearch from '../../state/billing/hooks/useBillSearch';
import PatientDetails from '../patientDetails';
import AddItem from './components/addItemModal';
import { BillPrint } from './components/billPrint';
import BillSearch from './components/billSearch';
import FinalCharges from './components/finalCharges';
import usePatientSearchbyId from '../../state/patientSearch/hooks/usePatientSearchbyId';
import useSaveGenerateBill from '../../state/billing/hooks/useGenerateBill';
import { getPatientById } from '../../state/patientSearch/queries';
import { getBillDetails } from './services';
const { Search } = Input;
const { Option } = Select;

const EditableContext = React.createContext();

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

  const save = async (e) => {
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
      sorter: {
        compare: (a, b) => a.amount - b.amount,
        multiple: 3,
      },
    },
    {
      title: 'GST(CGST+SGST)',
      dataIndex: 'gst',
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
          <a>Delete</a>
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
    row.total = finalCharges.discountedAmount + finalCharges.totalGST;
    newData.splice(index, 1, { ...item, ...row });
    setData(newData);
    calculateTotalCharges(newData);
  };

  let showSearch = "";
  const defaultbillDetails = {
    billId: '',
    createdAt: (new Date()).toDateString() + ' ' + (new Date()).toLocaleTimeString()
  };

  const defaultFinalCharges = {
    totalAmount: 0,
    totalDiscount: 0,
    totalGST: 0
  };
  const mockData = [{
    key: '1',
    name: "test1",
    quantity: 1,
    amount: 100,
    gst: 10,
    discount: 34,
    total: 100,
  }, {
    key: '2',
    name: "test2",
    quantity: 1,
    amount: 100,
    gst: 10,
    discount: 0,
    total: 100,
  }];
  let generateBillButton = <Col className="gutter-row" span={3}>
    <Button style={{ width: '90%' }} type="primary" onClick={generateBill}>Generate Bill</Button>
  </Col>;
  let printButton = "";
  const [showFilter, setShowFilter] = useState("patientId");
  const [state, setState] = useState("initial");
  const [paymentMode, setPaymentMode] = useState("Cash");
  // const [billResponse, isLoading, setBillSearch] = useBillSearch();
  const [billSearchResponse, setBillSearchResponse] = useState({});
  const [patientDetails, setPatientDetails] = useState({});

  const [generateBillStatus, setGenerateBillStatus] = useSaveGenerateBill();
  const [patient, isLoading1, setRequest] = usePatientSearchbyId();
  const [isModalVisible, setIsModalVisible] = useState(false);;
  const [billDetails, setBillDetails] = useState(defaultbillDetails);
  const [finalCharges, setFinalCharges] = useState(defaultFinalCharges);
  const [data, setData] = useState([]);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const queryParams = queryString.parse(location.search);

  useEffect(() => {
    // calculateTotalCharges(mockData);
    // setData(mockData);
    if (queryParams.context == 'registration' && state == "initial") {
      const tempData = [
        {
          key: '1',
          name: 'Registration',
          quantity: 1,
          amount: 50,
          gst: 0,
          discount: 0,
          total: 50,
        }];
      setData(tempData);
      calculateTotalCharges(tempData);
      patientSearch(queryParams.patientId);
    } else if (queryParams.context == 'consulation' && state == "initial") {
      const tempData = [
        {
          key: '1',
          name: 'Consultation ' + '(' + (queryParams.doctorName) + ')',
          quantity: 1,
          amount: queryParams.charges,
          gst: 0,
          discount: 0,
          total: Number(queryParams.charges) + 0,
        }];
      setData(tempData);
      calculateTotalCharges(tempData);
      patientSearch(queryParams.patientId);
    } else {
      showSearch = <BillSearch onSearch={onBillSearch} />;
    }


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
    }
  }, [generateBillStatus]);
  if (generateBillStatus.response == "success") {
    generateBillButton = "";
    printButton = <Col className="gutter-row" span={3}>
      <Button style={{ width: '90%' }} type="primary" onClick={handlePrint}>Print</Button>
    </Col>;
  }
  function getFinalCharges(dataList) {
    const finalCharges = {
      totalAmount: 0,
      totalGST: 0,
      totalDiscount: 0,
      discountedAmount: 0
    }

    dataList.forEach(data => {
      const discountedAmount = Number.parseInt(data.amount) - ((Number.parseInt(data.discount) / 100) * Number.parseInt(data.amount));
      finalCharges.totalAmount += Number.parseInt(data.amount);
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
    patientSearch(searchValue)
    getBillDetails(searchValue).then(data => {
      console.log("bill response", data);
      setBillDetails({
        billId: data.billId,
        createdAt: (new Date()).toDateString()
      });

      if (data["billDetailList"]) {

        const tempData = data["billDetailList"].map((item, index) => {
          return {
            key: item.itemName + index,
            id: item.id,
            name: item.itemName,
            billMapId: item.billMapId,
            quantity: 1,
            amount: item.mrp,
            gst: 0,
            discount: item.concessionPercentage,
            total: Number(item.mrp) - ((Number(item.concessionPercentage) / 100) * Number(item.mrp)),
          }
        });

        setData(tempData);
        calculateTotalCharges(tempData);
      }
    });
  }

  function patientSearch(patientId) {
    getPatientById(patientId).then(patientDetails => {
      setPatientDetails(patientDetails);
    }).catch(errInfo => {
      notification["error"]({
        message: 'Error',
        description: 'Error while searching patient with Id' + patientId,
        duration: 3
      });
    });
  }
  function onItemAdded(itemFormValue) {
    const newData = {
      key: Math.random(),
      name: itemFormValue.name,
      quantity: itemFormValue.quantity,
      amount: itemFormValue.amount,
      gst: 10,
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
    calculateTotalCharges(dataSource)
    setData(dataSource);
  };

  function calculateTotalCharges(tempDataList) {
    const finalCharges = getFinalCharges(tempDataList);
    console.log(finalCharges);
    setFinalCharges({
      totalAmount: finalCharges.discountedAmount + finalCharges.totalGST,
      totalDiscount: (finalCharges.totalAmount - finalCharges.discountedAmount) / finalCharges.totalAmount * 100,
      totalGST: finalCharges.totalGST
    });
  }
  function getTotalCharges(itemDetails) {
    return itemDetails.amount + itemDetails.gst - itemDetails.discount;
  }

  function onDiscountChange(discountValue) {
    console.log("Discount changed", discountValue);
  }

  function paymentMethod(e) {
    setPaymentMode(e.target.value);
  }

  function generateBill() {
    const body = {
      billId: null,
      billType: "",
      createdAt: new Date(),
      paymentStatus: "paid",
      paymentMode: paymentMode,
      patientId: patientDetails.patientId,
      totalCost: finalCharges.totalAmount,
      billDetailList: []
    };
    data.forEach(item => {
      const billItem = {
        id: null,
        itemName: item.name,
        itemId: null,
        billMapId: null,
        cost: item.total,
        concessionPercentage: item.discount,
        mrp: item.amount,
        concessionType: "discount"
      };
      body.billDetailList.push(billItem);
    });

    setGenerateBillStatus(body);
    setState("billGenerated");
  }

  return (
    <>
      <Modal title="Add Item" visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
        <AddItem onItemAdded={onItemAdded} />
      </Modal>
      <BillSearch onSearch={onBillSearch} />
      <PatientDetails patientId={patientDetails.patientId} />
      <div style={{ display: 'none' }}>
        <BillPrint ref={componentRef} itemList={data} finalCharges={finalCharges} patientDetails={patientDetails} billId={billDetails.billId} patientId={queryParams.patientId} />
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
        }}
      >
        Add Item
        </Button>
      <Table columns={columns} components={components} dataSource={data} onChange={onChange} rowClassName={() => 'editable-row'} />

      <FinalCharges finalCharges={finalCharges} onDiscountChange={onDiscountChange} />
      <Divider>Payment</Divider>
      <Radio.Group onChange={paymentMethod} value={paymentMode}>
        <Radio value="Cash">Cash</Radio>
        <Radio value="Card">Card</Radio>
        <Radio value="UPI">UPI</Radio>
        <Radio value="Paytm">Paytm</Radio>
      </Radio.Group>
      <br /><br /><br />
      <Row gutter={24}>
        {generateBillButton}
        {/* <Col className="gutter-row" span={3}>
          <Button type="primary">Cancel</Button>
        </Col> */}
        {printButton}

        <Col className="gutter-row" span={3}>
          <Button style={{ width: '90%' }} type="primary" onClick={value => history.push({ pathname: '/home/appointment', search: '?patientId='.concat(queryParams.patientId) })}>Go To Appointment</Button>
        </Col>
      </Row>
    </>
  );
};

export default Billing;