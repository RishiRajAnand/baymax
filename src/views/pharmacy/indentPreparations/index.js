import { MinusCircleOutlined, OrderedListOutlined, PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Col, DatePicker, Divider, Form, Input, InputNumber, Row, Select, Space, Switch } from 'antd';
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

const IndentPreparation = () => {
    let options = [];
    let index = 0;
    const [name, setName] = useState("");
    const [items, setItems] = useState(['ABC pharma', 'Medimex store']);

    const onFinish = formData => {
        const form = formData.user;
        const body = {
            "empId": "test123",
            "doctorName": form.name,
            "department": form.department,
            "experience": form.experience,
            "speciality": form.speciality,
            "highestQualification": form.highestQualification,
            "consulationCharge": form.consulationCharge,
            "designation": form.designation
        }
    };
    function onNameChange(event) {
        // console.log("sas", event.target.value);
        setName(event.target.value);
    };
    function addItem() {
        setName('');
        setItems([...items, name || `New item ${index++}`]);
    }

    const onSearchProduct = (value) => {

    }

    return (
        <>
            {/* <Button type="dashed" style={{ marginLeft: '15px' }} icon={<OrderedListOutlined />}>Purchase list</Button>
            <Button type="dashed" style={{ marginLeft: '15px' }} icon={<OrderedListOutlined />}>Medicine list</Button> */}
            <br /><br /><br />
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name={['user', 'patientId']} label="Patient Search" rules={[{ required: true }]}>
                            <AutoComplete
                                dropdownClassName="certain-category-search-dropdown"
                                dropdownMatchSelectWidth={500}
                                style={{ width: '100%' }}
                            >
                                <Input.Search size="default" placeholder="Reg. No" />
                            </AutoComplete>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'indentDate']} label="Indent Date">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'patientName']} label="Patient Name">
                            <Input placeholder="Patient Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'consultantName']} label="Consultant Name">
                            <Input placeholder="Consultant Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'mobileNumber']} label="Mobile">
                            <Input placeholder="Mobile Number" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'comments']} label="Comments">
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'address']} label="Address">
                            <Input.TextArea />
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
                                            <InputNumber style={{ minWidth: 175 }} placeholder="Quantity" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'uom']}
                                            fieldKey={[field.fieldKey, 'uom']}
                                        >
                                            <Input style={{ minWidth: 125 }} placeholder="UOM" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'mrp']}
                                            fieldKey={[field.fieldKey, 'mrp']}
                                        >
                                            <InputNumber style={{ minWidth: 175 }} placeholder="MRP" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'stockQuantity']}
                                            fieldKey={[field.fieldKey, 'stockQuantity']}
                                        >
                                            <InputNumber style={{ minWidth: 175 }} placeholder="Stock Quantity" />
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
                                        <PlusOutlined /> Add Product
                </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item name={['user', 'totalAmount']} label="Total Amount">
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Form.Item htmlType="submit">
                            <Button type="primary">
                                Bill
                            </Button>
                            <Button type="primary" style={{ marginLeft: '15px' }} >
                                Add New
                            </Button>
                            <Button style={{ marginLeft: '15px' }} type="primary">
                                Print
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </>
    );
};


export default IndentPreparation;