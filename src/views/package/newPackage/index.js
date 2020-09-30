import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Col, DatePicker, Form, Input, Switch, InputNumber, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
const { Option } = Select;
const { TextArea } = Input;
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 9 },
};
// eslint-disable-next-line
const validateMessages = {
    // eslint-disable-next-line
    required: '${label} is required!',
    types: {
        // eslint-disable-next-line
        email: '${label} is not validate email!',
        // eslint-disable-next-line
        number: '${label} is not a validate number!',
    },
    number: {
        // eslint-disable-next-line
        range: '${label} must be between ${min} and ${max}',
    },
};

const NewPackage = () => {
    let options = [];
    const onFinish = formData => {
        const form = formData.user;
    };

    const onSearchProduct = (value) => {

    }
    return (
        <>
            <Button type="dashed" icon={<PlusOutlined />}>All Packages</Button>
            {/* <Button type="dashed" style={{ marginLeft: '15px' }} icon={<OrderedListOutlined />}>Manage Medicine</Button>
            <Button type="dashed" style={{ marginLeft: '15px' }} icon={<OrderedListOutlined />}>Import Medicine</Button> */}
            <br /><br /><br />
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name={['user', 'packageName']} label="Package Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'packageEndDate']} label="Package End Date">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'packagePrice']} label="Package Price" rules={[{ required: true, type: 'number', min: 0, max: 5000 }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'status']} label="Status" >
                            <Switch />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                <Form.List name="users">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map(field => (
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'productName']}
                                            fieldKey={[field.fieldKey, 'productName']}
                                            rules={[{ required: true, message: 'Missing Product Name!' }]}
                                        >
                                            <AutoComplete
                                                onSearch={onSearchProduct}
                                                dropdownClassName="certain-category-search-dropdown"
                                                dropdownMatchSelectWidth={500}
                                                style={{ width: 250 }}
                                                options={options}
                                            >
                                                <Input.Search size="default" placeholder="Product name" />
                                            </AutoComplete>
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'quantity']}
                                            fieldKey={[field.fieldKey, 'quantity']}
                                        >
                                            <InputNumber style={{ minWidth: 200 }} placeholder="quantity" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'price']}
                                            fieldKey={[field.fieldKey, 'price']}
                                        >
                                            <InputNumber style={{ minWidth: 200 }} placeholder="price" />
                                        </Form.Item>
                                        <MinusCircleOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            add();
                                        }}
                                        block
                                    >
                                        <PlusOutlined /> Add Items
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Form.Item>
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



export default NewPackage;
