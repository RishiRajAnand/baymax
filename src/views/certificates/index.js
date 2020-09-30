import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Divider, InputNumber, Button, Upload, Select, notification, DatePicker } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 9 },
};
const Certificates = () => {
    const [value, setValue] = useState('');

    const onFinish = formData => {
        const form = formData.user;
    };

    return (
        <>
            <Form {...layout} name="nest-messages" onFinish={onFinish}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name={['user', 'name']} label="Name">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'guardianName']} label="Guardian Name">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'relation']} label="Relation">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'dateAndTime']} label="Date and time">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <ReactQuill theme="snow" value={value} onChange={setValue} />

            <Row style={{ textAlign: 'right', marginTop: 30 }}>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Generate
                            </Button>
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default Certificates;
