import { Button, Col, Descriptions, Divider, Form, Input, InputNumber, Radio, Row, Select, Table, Popconfirm, Modal } from 'antd';
import queryString from 'query-string';
import React, { useRef, useState, useEffect, useContext } from 'react';
import { useReactToPrint } from 'react-to-print';
import useBillSearch from '../../state/billing/hooks/useBillSearch';
import PatientDetails from '../patientDetails';
import AddItem from './components/addItemModal';
import { BillPrint } from './components/billPrint';
import BillSearch from './components/billSearch';
import FinalCharges from './components/finalCharges';

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
      title: 'GST',
      dataIndex: 'gst',
      sorter: {
        compare: (a, b) => a.gst - b.gst,
        multiple: 3,
      },
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
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
    newData.splice(index, 1, { ...item, ...row });
    setData(newData);
  };

  let showSearch = "";
  const defaultbillDetails = {
    billId: '1600581617320',
    createdAt: new Date()
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
  const [showFilter, setShowFilter] = useState("patientId");
  const [billResponse, isLoading, setBillSearch] = useBillSearch();
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    calculateTotalCharges(mockData);
    setData(mockData);
  }, []);

  function getFinalCharges(dataList) {
    const finalCharges = {
      totalAmount: 0,
      totalGST: 0,
      totalDiscount: 0
    }
    dataList.forEach(data => {
      finalCharges.totalAmount += data.amount;
      finalCharges.totalDiscount += data.discount;
      finalCharges.totalGST += data.gst;
    });
    return finalCharges;
  }
  if (billResponse) {
    const tempData = [];
    if (billResponse["billDto"]) {
      billDetails.billId = billResponse["billDto"]["billId"];
      billDetails.createdAt = new Date(billResponse["billDto"]["createdAt"]);
    }
    if (billResponse["billDto"] && billResponse["medicineList"]) {
      const medicineList = billResponse["medicineList"];
      if (medicineList !== null && medicineList.length > 0) {
        medicineList.forEach(medicine => {
          tempData.push({
            key: '1',
            name: medicine.medName,
            quantity: medicine.days,
            amount: medicine.cost,
            gst: 10,
            discount: 0,
            total: medicine.cost * 1,
          });
        });
      }
    }

    if (billResponse["billDto"] && billResponse["testList"]) {
      const testList = billResponse["testList"];
      if (testList !== null && testList.length > 0) {

        testList.forEach(test => {
          tempData.push({
            key: '1',
            name: test.testId,
            quantity: 1,
            amount: test.cost,
            gst: 10,
            discount: 0,
            total: test.cost * 1,
          });
        });
      }
    }
    // setData([...data, ...tempData]);
  }

  if (queryParams.context === 'registration') {
    data = [
      {
        key: '1',
        name: 'Registration',
        quantity: 1,
        amount: 300,
        quantity: 1,
        gst: 10,
        discount: 0,
        total: 300,
      }];
    billDetails.billId = queryParams.receiptId;
    billDetails.totalAmount = 300;
    billDetails.totalGST = 10;
    billDetails.totalDiscount = 0;
  } else if (queryParams.context === 'consulation') {
    data = [
      {
        key: '1',
        name: 'Consulation ' + '(' + (queryParams.doctorName) + ')',
        quantity: 1,
        amount: queryParams.charges,
        gst: 5,
        discount: 50,
        total: queryParams.charges * 1,
      }];
    billDetails.billId = queryParams.receiptId;
    billDetails.totalAmount = queryParams.charges * 1;
    billDetails.totalGST = 10;
    billDetails.totalDiscount = 50;
  } else {
    showSearch = <BillSearch onSearch={onBillSearch} />;
  }

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  function onBillSearch(searchValue, searchFilter) {
    setBillSearch(searchValue, searchFilter);
  }

  function onItemAdded(itemFormValue) {
    const newData = {
      key: Math.random(),
      name: itemFormValue.user.name,
      quantity: itemFormValue.user.quantity,
      amount: 100,
      gst: 10,
      discount: 0,
      total: 100,
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
    setFinalCharges({
      totalAmount: finalCharges.totalAmount,
      totalDiscount: finalCharges.totalDiscount,
      totalGST: finalCharges.totalGST
    });
  }
  function getTotalCharges(itemDetails) {
    return itemDetails.amount + itemDetails.gst - itemDetails.discount;
  }

  function onDiscountChange(discountValue) {
    console.log("Discount changed", discountValue);
  }

  return (
    <>
      <Modal title="Add Item" visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
        <AddItem onItemAdded={onItemAdded} />
      </Modal>
      {showSearch}
      <PatientDetails patientId={queryParams.patientId} />
      <div style={{ display: 'none' }}>
        <BillPrint ref={componentRef} itemList={data} />
      </div>
      <Divider>Bill Details</Divider>
      <Descriptions>
        <Descriptions.Item label="Bill Id">{queryParams.receiptId}</Descriptions.Item>
        {/* <Descriptions.Item label="Receipt Id">{queryParams.receiptId}</Descriptions.Item> */}
        <Descriptions.Item label="Date and time">2018-04-24 18:00:00</Descriptions.Item>
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
      <Radio.Group>
        <Radio value={1}>Cash</Radio>
        <Radio value={2}>Card</Radio>
        <Radio value={3}>UPI</Radio>
        <Radio value={4}>Paytm</Radio>
      </Radio.Group>
      <br /><br /><br />
      <Row gutter={24}>
        <Col className="gutter-row" span={3}>
          <Button type="primary">Pay</Button>
        </Col>
        <Col className="gutter-row" span={3}>
          <Button type="primary">Cancel</Button>
        </Col>
        <Col className="gutter-row" span={3}>
          <Button type="primary" onClick={handlePrint}>Print</Button>
        </Col>
        <Col className="gutter-row" span={3}>
          <Button type="primary" onClick={value => history.push({ pathname: '/home/appointment', search: '?patientId='.concat(queryParams.patientId) })}>Go To Appointment</Button>
        </Col>
      </Row>
    </>
  );
};

export default Billing;