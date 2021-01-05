import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Radio, Divider, Descriptions, Select, Badge, Table, Row, Col } from 'antd';
const { Option } = Select;

const FinalCharges = (props) => {
  function onDiscountChange(value) {
    props.onDiscountChange(value);
  }
  return (
    <Form name="final_charges">
      <Row gutter={24}>
        <Col span={8} key={1}>
          <Form.Item label="Total Amount">
            <span className="ant-form-text">{props.finalCharges.totalAmount}</span>
          </Form.Item>
        </Col>
        <Col span={8} key={2}>
          <Form.Item label="Total discount(%)">
            <span className="ant-form-text">{props.finalCharges.totalDiscount}</span>
          </Form.Item>
        </Col>
        <Col span={8} key={3}>
          <Form.Item label="Total GST">
            <span className="ant-form-text">{props.finalCharges.totalGST}</span>
          </Form.Item>
        </Col>
      </Row>
    </Form>);
};
export default FinalCharges;