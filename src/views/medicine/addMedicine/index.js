import React, { useState, useEffect } from 'react';
import { Form, Input, Button, InputNumber, Table, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import useAddMedicine from '../../../state/addMedicine/hooks/useAddMedicine';
import Spinner from '../../../components/spinner';
import useMedicineSearch from '../../../state/addMedicine/hooks/useSearchMedicine';

const AddMedicine = () => {
    const data = [];
    const [form] = Form.useForm();
    // const [, forceUpdate] = useState();
    const [status, isLoading, setRequest] = useAddMedicine();
    const [medicines, isLoadings, setMedicineSearch] = useMedicineSearch();
    // To disable submit button at the beginning.
    useEffect(() => {
        if (status) {
            notification["success"]({
                message: 'SUCCESS',
                description: 'Medicine added successfully',
                duration: 3
            });
            setMedicineSearch();
        }
        if (medicines.length === 0) {
            setMedicineSearch();
        }
        // forceUpdate({});
    }, [status]);
    console.log("medicines list", medicines);
    const onFinish = form => {
        const body = {
            "medicineName": form.name,
            "medicineType": form.type,
            "strength": form.strength,
            "price": form.price,
        };
        setRequest(body);
    };
    const columns = [
        {
            title: 'Medicine Name',
            dataIndex: 'medicineName',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.medicineName - b.medicineName,
        },
        {
            title: 'Strength',
            dataIndex: 'strength'
        },
        {
            title: 'Medicine Type',
            dataIndex: 'medicineType',
            filters: [
                {
                    text: 'Aspirin',
                    value: 'aspirin',
                },
                {
                    text: 'Painkillers',
                    value: 'painkiller',
                },
                // {
                //   text: 'Submenu',
                //   value: 'Submenu',
                //   children: [
                //     {
                //       text: 'Green',
                //       value: 'Green',
                //     },
                //     {
                //       text: 'Black',
                //       value: 'Black',
                //     },
                //   ],
                // },
            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.medicineType.indexOf(value) === 0,
            sorter: (a, b) => a.medicineType.length - b.medicineType.length,
            sortDirections: ['descend'],
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
                medicineName: medicine.medicineName,
                price: medicine.price,
                strength: medicine.strength,
                medicineType: medicine.medicineType,
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
                    rules={[{ required: true, message: 'Please medicine name!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Medicine name" />
                </Form.Item>
                <Form.Item
                    name="type"
                    rules={[{ required: true, message: 'Please input a type!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Medicine type" />
                </Form.Item>
                <Form.Item
                    name="strength"
                    rules={[{ required: true, message: 'Please input strength!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Strength" />
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
                            Add Medicine
                        </Button>
                    )}
                </Form.Item>
            </Form>
            <br /><br /><br />
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </>
    );
};

export default AddMedicine;