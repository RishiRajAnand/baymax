import React from 'react';
import { Divider, Descriptions, DatePicker, Badge, Form, Input, Button, Space, Select, InputNumber, AutoComplete } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import '../prescription/prescription.css';

const onFinish = values => {
    console.log('Received values of form:', values);
};

const { Option } = Select;

const renderTitle = (title: string) => {
    return (
        <span>
            {title}
            <a
                style={{ float: 'right' }}
                href="https://www.google.com/search?q=antd"
                target="_blank"
                rel="noopener noreferrer"
            >
                more
        </a>
        </span>
    );
};

const renderItem = (title: string, count: number) => {
    return {
        value: title,
        label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {title}
                <span>
                    <UserOutlined /> {count}
                </span>
            </div>
        ),
    };
};

const options = [
    {
        label: renderTitle('Anti Diabetic'),
        options: [renderItem('Glycomet 500 SR Tablet', 100), renderItem('Nefrosave Tablet', 500)],
    },
    {
        label: renderTitle('Cardiac'),
        options: [renderItem('Cardace 2.5 Tablet', 100), renderItem('Envas 5 Tablet', 200)],
    },
    {
        label: renderTitle('Heparins'),
        options: [renderItem('Thrombophob Ointment', 1)],
    },
];
const optionsTests = [
    { value: 'Blood Test' },
    { value: 'Urine Test' },
    { value: 'Dengue Test' },
];

const Prescription = () => {
    return (
        <>
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
            <br></br>

            <Divider>Prescribe Medicines</Divider>
            <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                <Form.List name="users">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map(field => (
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'medicineName']}
                                            fieldKey={[field.fieldKey, 'medicineName']}
                                            rules={[{ required: true, message: 'Missing Medicine name' }]}
                                        >
                                            <AutoComplete
                                                dropdownClassName="certain-category-search-dropdown"
                                                dropdownMatchSelectWidth={500}
                                                style={{ width: 250 }}
                                                options={options}
                                            >
                                                <Input.Search size="default" placeholder="Medicine" />
                                            </AutoComplete>
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'dosage']}
                                            fieldKey={[field.fieldKey, 'dosage']}
                                            rules={[{ required: true, message: 'Missing Dosage' }]}
                                        >
                                            <Select
                                                placeholder="Dosage per day (M-A-N)"
                                                allowClear>
                                                <Option value="1-0-0">1-0-0</Option>
                                                <Option value="1-1-0">1-1-0</Option>
                                                <Option value="1-1-1">1-1-1</Option>
                                                <Option value="0-0-1">0-0-1</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'numberOfDays']}
                                            fieldKey={[field.fieldKey, 'numberOfDays']}
                                            rules={[{ required: true, message: 'Missing Number of days' }]}
                                        >
                                            <InputNumber />
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
                                        <PlusOutlined /> Add Medicines
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
        </Button>
                </Form.Item>
            </Form>
            <br></br>
            <Divider>Prescribe Tests</Divider>
            <Form name="dynamic_form_nest_item2" onFinish={onFinish} autoComplete="off">
                <Form.List name="users">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map(field => (
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'testName']}
                                            fieldKey={[field.fieldKey, 'testName']}
                                            rules={[{ required: true, message: 'Missing test name' }]}
                                        >
                                            <AutoComplete
                                                style={{ width: 200 }}
                                                options={optionsTests}
                                                placeholder="Type test name"
                                                filterOption={(inputValue, option) =>
                                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                }
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'date']}
                                            fieldKey={[field.fieldKey, 'date']}
                                            rules={[{ required: false }]}
                                        >
                                            <DatePicker />
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
                                        <PlusOutlined /> Add Tests
                </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>);
};

export default Prescription;
