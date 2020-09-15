import React from 'react';
import { Form, Input, InputNumber, Button, Select } from 'antd';
import '../addDoctor/addDoctor.css';

const { Option } = Select;

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

const PhonePrefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select defaultValue="91" style={{ width: 70 }}>
            <Option value="91">+91</Option>
            <Option value="87">+87</Option>
        </Select>
    </Form.Item>
);

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
    console.log(`Selected: ${value}`);
}

const AddDoctor = () => {
    const onFinish = values => {
        console.log(values);
    };

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'phone']} label="Phone Number" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                <Input addonBefore={PhonePrefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={['user', 'specialization']} label="Specialization">
                <Select
                    mode="multiple"
                    size="default"
                    placeholder="Please select"
                    defaultValue={['a10', 'c12']}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                >
                    {children}
                </Select>
            </Form.Item>
            <Form.Item name={['user', 'fees']} label="Fees" rules={[{ type: 'number', min: 0, max: 10000 }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
        </Button>
            </Form.Item>
        </Form>
    );
};

export default AddDoctor;
