import React, { useState } from 'react';
import { Modal, Button, Select, Form, Row, Col } from 'antd';
const { Option } = Select;

const BarcodeCustomize = () => {
    const onFinish = formData => {
        console.log(formData);
    };


    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    return (
        <>
            <Form {...layout} name="nest-messages" onFinish={onFinish}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name={'includes'} label="Includes">
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Select includes"
                                defaultValue={['productName']}
                                onChange={handleChange}
                                optionLabelProp="label"
                            >
                                <Option value="productName" label="Product Name">
                                    {/* <div className="demo-option-label-item">
                                        <span role="img" aria-label="China">🇨🇳</span>China (中国)</div> */}
                                </Option>
                                <Option value="productPrice" label="Product Price">
                                    {/* <div className="demo-option-label-item">
                                        <span role="img" aria-label="USA">🇺🇸</span>USA (美国)</div> */}
                                </Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default BarcodeCustomize;