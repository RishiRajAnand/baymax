import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select, notification } from 'antd';
import useRegistration from '../../state/registration/hooks/useRegistration';
import Spinner from '../../components/spinner';
import { registration } from '../../state/registration/queries';

const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 },
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

const Registration = ({ location, history }) => {
    const onFinish = formData => {

        const form = formData.user;
        const body = {
            "patientName": form.name,
            "age": form.age,
            "contactNum": form.phone,
            "altContactNum": form.alternatecontact,
            "street": form.address,
            "state": form.state,
            "country": form.country,
            "visitType": form.visit
        };
        registration(body).then(data => {
            notification["success"]({
                message: 'SUCCESS',
                description: 'The patient has been registered successfully',
                duration: 3
            });
            history.push({ pathname: '/home/billing', search: '?patientId=' + data.patientId + '&receiptId=' + data.recieptId + '&context=registration' });
        }).catch(errr => {
            notification["error"]({
                message: 'Error',
                description: 'There was some error in registration',
                duration: 3
            });

        });
        // setRequest(body);
    };

    return (
        <>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'gender']} label="Gender" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select Gender"
                        allowClear>
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                    </Select>
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
                <Form.Item name={['user', 'alternatecontact']} label="Alternate Contact Number">
                    <Input addonBefore={PhonePrefixSelector} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name={['user', 'address']} label="Address">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name={['user', 'state']} label="State">
                    <Select
                        defaultValue="bihar"
                        placeholder="Select State"
                        allowClear>
                        <Option value="bihar">Bihar</Option>
                        <Option value="up">UP</Option>
                        <Option value="Karnataka">Karnataka</Option>
                        <Option value="Jharkhand">Jharkhand</Option>
                    </Select>
                </Form.Item>
                <Form.Item name={['user', 'country']} label="Country">
                    <Select
                        defaultValue="india"
                        placeholder="Select Country"
                        allowClear>
                        <Option value="india">India</Option>
                        <Option value="us">US</Option>
                    </Select>
                </Form.Item>
                <Form.Item name={['user', 'visit']} label="Visit Type" >
                    <Select placeholder="Select Visit type">
                        <Option value="IPD">IPD</Option>
                        <Option value="OPD">OPD</Option>
                        <Option value="OPD to IPD">OPD to IPD</Option>
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" size='large' htmlType="submit">
                        Submit
        </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Registration;
