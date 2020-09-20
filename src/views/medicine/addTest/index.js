import React, { useState, useEffect } from 'react';
import { Form, Input, Button, InputNumber, Table, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import useAddTest from '../../../state/addMedicine/hooks/useAddTest';
import Spinner from '../../../components/spinner';
import useSearchTest from '../../../state/addMedicine/hooks/useSearchTest';

const AddTest = () => {
    const data = [];
    const [form] = Form.useForm();
    // const [, forceUpdate] = useState();
    const [status, isLoading, setRequest] = useAddTest();
    const [medicines, isLoadings, setMedicineSearch] = useSearchTest();
    // To disable submit button at the beginning.
    useEffect(() => {
        if (status) {
            notification["success"]({
                message: 'SUCCESS',
                description: 'Test added successfully',
                duration: 3
            });
            setMedicineSearch();
        }
        if (medicines.length === 0) {
            setMedicineSearch();
        }
        // forceUpdate({});
    }, [status]);
    const onFinish = form => {
        const body = {
            "testName": form.name,
            "price": form.price,
        };
        setRequest(body);
    };
    const columns = [
        {
            title: 'Test Name',
            dataIndex: 'testName',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.testName - b.testName,
        },
        {
            title: 'Price',
            dataIndex: 'price'
        }
    ];
    if (medicines.length > 0) {
        medicines.forEach((medicine, index) => {
            data.push({
                key: index,
                testName: medicine.testName,
                price: medicine.price
            });
        });
    }

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    return (
        <>
            <Spinner show={isLoading} />
            <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please select test name!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Test name" />
                </Form.Item>
                <Form.Item
                    name="price"
                    rules={[{ required: true, message: 'Please input price!' }]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={
                                !form.isFieldsTouched(true) ||
                                form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Add Test
                        </Button>
                    )}
                </Form.Item>
            </Form>
            <br /><br /><br />
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </>
    );
};

export default AddTest;