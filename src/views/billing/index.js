import React from 'react';
import { Form, Input, Button, InputNumber, Radio, Divider, Descriptions, Badge, Table, Row, Col } from 'antd';

const { Search } = Input;

const Billing = () => {
  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'name',
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

  const data = [
    {
      key: '1',
      name: 'Registration',
      amount: 98,
      gst: 98,
      discount: 60,
      total: 70,
    },
    {
      key: '2',
      name: 'Paracetamol',
      amount: 98,
      gst: 98,
      discount: 66,
      total: 89,
    },
    {
      key: '3',
      name: 'Blood test',
      amount: 98,
      gst: 98,
      discount: 90,
      total: 70,
    },
    {
      key: '4',
      name: 'General ward charges',
      amount: 88,
      gst: 88,
      discount: 99,
      total: 89,
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <>
      <Search style={{ width: '30%' }}
        placeholder="Search by Patient Name / ID"
        enterButton="Search"
        size="large"
        onSearch={value => console.log(value)}
      />
      <Divider>Patient Details</Divider>
      <Descriptions bordered>
        <Descriptions.Item label="Name">Rishi</Descriptions.Item>
        <Descriptions.Item label="Visit Type">General</Descriptions.Item>
        <Descriptions.Item label="Age">27</Descriptions.Item>
        <Descriptions.Item label="Admission date">2018-04-24 18:00:00</Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
          <Badge status="warning" text="pending" />
        </Descriptions.Item>
      </Descriptions>

      <Divider>Bill Details</Divider>
      <Descriptions>
        <Descriptions.Item label="Bill Id">R23231</Descriptions.Item>
        <Descriptions.Item label="Receipt Id">P2121</Descriptions.Item>
        <Descriptions.Item label="Date and time">2018-04-24 18:00:00</Descriptions.Item>
      </Descriptions>
      
      <Table columns={columns} dataSource={data} onChange={onChange} />

      <Form name="final_charges">
        <Row gutter={24}>
          <Col span={8} key={1}>
            <Form.Item label="Total Amount">
              <span className="ant-form-text">2000</span>
            </Form.Item>
          </Col>
          <Col span={8} key={2}>
            <Form.Item label="Total discount">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={8} key={3}>
            <Form.Item label="Total GST">
              <span className="ant-form-text">2000</span>
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
          <Button type="primary">Settle bill</Button>
        </Col>
        <Col className="gutter-row" span={3}>
          <Button type="primary">Cancel</Button>
        </Col>
        <Col className="gutter-row" span={3}>
          <Button type="primary">Print</Button>
        </Col>
      </Row>
    </>
  );
};

export default Billing;