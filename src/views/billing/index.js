import { Button, Col, Descriptions, Divider, Form, Input, InputNumber, Radio, Row, Select, Table } from 'antd';
import queryString from 'query-string';
import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import useBillSearch from '../../state/billing/hooks/useBillSearch';
import PatientDetails from '../patientDetails';
import { BillPrint } from './components/billPrint';
import BillSearch from './components/billSearch';

const { Search } = Input;
const { Option } = Select;

const columns = [
  {
    title: 'Item Name',
    dataIndex: 'name',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
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
];

const Billing = ({ location, history }) => {
  let data = [];
  let showSearch = "";
  const billDetails = {
    billId: '1600581617320',
    createdAt: new Date(),
    totalAmount: 0,
    totalDiscount: 0,
    totalGST: 0
  };
  const [showFilter, setShowFilter] = useState("patientId");
  const [billResponse, isLoading, setBillSearch] = useBillSearch();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const queryParams = queryString.parse(location.search);

  //   useEffect(() => {
  //     if (showFilter === "patientId") {
  //         setRequest();
  //     }
  // }, [showFilter]);

  if (billResponse) {
    if (billResponse["billDto"]) {
      billDetails.billId = billResponse["billDto"]["billId"];
      billDetails.createdAt = new Date(billResponse["billDto"]["createdAt"]);
    }
    if (billResponse["billDto"] && billResponse["medicineList"]) {
      const medicineList = billResponse["medicineList"];
      if (medicineList !== null && medicineList.length > 0) {
        medicineList.forEach(medicine => {
          data.push({
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
          data.push({
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
    // "medicineList": [
    //   {
    //     "prescribedMedId": "TestMedId",
    //     "medName": null,
    //     "days": null,
    //     "cost": null,
    //     "billId": "1600268310054",
    //     "validForUsage": null
    //   }
    // ],
    //   "testList": [
    //     {
    //       "testId": "test123",
    //       "appointmentId": null,
    //       "dateOfBooking": null,
    //       "dateOfResult": null,
    //       "reportDesc": null,
    //       "cost": null,
    //       "testDesc": null,
    //       "billId": "1600268310054",
    //       "validForUsage": null
    //     }
    // }

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

  return (
    <>
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

      <Table columns={columns} dataSource={data} onChange={onChange} />

      <Form name="final_charges">
        <Row gutter={24}>
          <Col span={8} key={1}>
            <Form.Item label="Total Amount">
              <span className="ant-form-text">{billDetails.totalAmount}</span>
            </Form.Item>
          </Col>
          <Col span={8} key={2}>
            <Form.Item label="Total discount">
              <InputNumber defaultValue={billDetails.totalDiscount} />
            </Form.Item>
          </Col>
          <Col span={8} key={3}>
            <Form.Item label="Total GST">
              <span className="ant-form-text">{billDetails.totalGST}</span>
            </Form.Item>
          </Col>
        </Row>
      </Form>
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