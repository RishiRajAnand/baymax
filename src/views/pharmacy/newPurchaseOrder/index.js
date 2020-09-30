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

const NewPurchaseOrder = () => {
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
            <Button type="dashed" style={{ marginLeft: '15px' }} icon={<OrderedListOutlined />}>Purchase list</Button>
            <Button type="dashed" style={{ marginLeft: '15px' }} icon={<OrderedListOutlined />}>Medicine list</Button>
            <br /><br /><br />
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name={['user', 'rol']} label="ROL">
                            <Switch />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name={['user', 'supplierName']} label="Suppliers Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'deliveryDate']} label="Delivery Date">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'orderDate']} label="Order Date">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'StoreName']} label="Store Name">
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Select Store"
                                dropdownRender={menu => (
                                    <div>
                                        {menu}
                                        <Divider style={{ margin: '4px 0' }} />
                                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                            <Input style={{ flex: 'auto' }} value={name} onChange={onNameChange} />
                                            <a
                                                style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                                onClick={addItem}
                                            >
                                                <PlusOutlined /> Add item
                                    </a>
                                        </div>
                                    </div>
                                )}
                            >
                                {items.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'salesStartDate']} label="Sales Start Date">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'salesEndDate']} label="Sales End Date">
                            <DatePicker style={{ width: '100%' }} />
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
                                            name={[field.name, 'stockQty']}
                                            fieldKey={[field.fieldKey, 'stockQty']}
                                        >
                                            <InputNumber style={{ minWidth: 125 }} placeholder="Stock qty" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'soldQty']}
                                            fieldKey={[field.fieldKey, 'soldQty']}
                                        >
                                            <InputNumber style={{ minWidth: 125 }} placeholder="Sold qty" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'orderQty']}
                                            fieldKey={[field.fieldKey, 'orderQtyLU']}
                                        >
                                            <InputNumber style={{ minWidth: 125 }} placeholder="Order qty(LU)" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'orderQty']}
                                            fieldKey={[field.fieldKey, 'orderQtySU']}
                                        >
                                            <InputNumber style={{ minWidth: 125 }} placeholder="Order qty (SU)" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'luPrice']}
                                            fieldKey={[field.fieldKey, 'luPrice']}
                                        >
                                            <InputNumber style={{ minWidth: 125 }} placeholder="LU Price" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'suPrice']}
                                            fieldKey={[field.fieldKey, 'suPrice']}
                                        >
                                            <InputNumber style={{ minWidth: 125 }} placeholder="SU Price" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'amount']}
                                            fieldKey={[field.fieldKey, 'amount']}
                                        >
                                            <InputNumber style={{ minWidth: 225 }} placeholder="Amount" />
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
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Save
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



export default NewPurchaseOrder;
