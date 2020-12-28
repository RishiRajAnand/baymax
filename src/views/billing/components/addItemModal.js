import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Radio, Divider, Descriptions, Select, Badge, Table, Row, Col } from 'antd';
const { Option } = Select;

const AddItem = (props) => {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    function onFinish(value) {
        props.onItemAdded(value);
    }
    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} >
            <Form.Item name={['user', 'name']} label="Item name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'quantity']} label="Quantity" rules={[{ type: 'number' }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'itemType']} label="Item type" >
                <Select defaultValue="medicine" placeholder="Item type">
                    <Option value="medicine">Medicine</Option>
                    <Option value="test">Test</Option>
                    <Option value="consulation">Consulation</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Item
                </Button>
            </Form.Item>
        </Form>);
};
export default AddItem;