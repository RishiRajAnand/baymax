import React, { useState, useEffect } from 'react';
import { Form, Input, Button, InputNumber, Radio, Divider, Descriptions, Select, Badge, Table, Row, Col } from 'antd';
const { Option } = Select;

const FinalCharges = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ discount: props.finalCharges.totalDiscount });
  }, [props.finalCharges.totalDiscount]);

  function onDiscountChange(value) {
    props.onDiscountChange(value);
  }
  return (
    <Form name="final_charges" form={form}>
      <Row gutter={24}>
        <Col span={8} key={1}>
          <Form.Item label="Total Amount">
            <span className="ant-form-text">{props.finalCharges.totalAmount}</span>
          </Form.Item>
        </Col>
        <Col span={8} key={2}>
          <Form.Item label="Total discount(%)" name="discount">
            <InputNumber
              min={0}
              
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              onChange={onDiscountChange}
            />
            {/* <span className="ant-form-text">{props.finalCharges.totalDiscount}</span> */}
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