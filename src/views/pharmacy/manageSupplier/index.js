import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, notification, Table, Space } from 'antd';
import React, { useEffect } from 'react';
import Spinner from '../../../components/spinner';
import useAddMedicine from '../../../state/addMedicine/hooks/useAddMedicine';
import useMedicineSearch from '../../../state/addMedicine/hooks/useSearchMedicine';
import useAddSupplier from '../../../state/pharmacy/hooks/useAddSupplier';
import useGetAllSuppliers from '../../../state/pharmacy/hooks/useGetAllSupplier';

const ManageSupplier = () => {
    const data = [];
    const [form] = Form.useForm();
    // const [, forceUpdate] = useState();
    const [status, isLoading, setRequest] = useAddSupplier();
    const [suppliers, isLoadings, setMedicineSearch] = useGetAllSuppliers();
    // To disable submit button at the beginning.
    useEffect(() => {
        if (status) {
            notification["success"]({
                message: 'SUCCESS',
                description: 'Supplier added successfully',
                duration: 3
            });
            setMedicineSearch();
        }
        if (suppliers.length === 0) {
            setMedicineSearch();
        }
        // forceUpdate({});
    }, [status]);
    const onFinish = formData => {
        const body = {
            "supplierName": formData.name,
            "email": formData.email,
            "phoneNumber": formData.phone,
            "address": formData.address,
        };
        setRequest(body);
        form.setFieldsValue({
            "name": "",
            "email": "",
            "phone": "",
            "address": "",
        });
        
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'supplierName',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.medicineName - b.medicineName,
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber'
        },
        {
            title: 'Address',
            dataIndex: 'address'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={()=> editSupplier(record)}>Edit</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    function editSupplier(record) {
        form.setFieldsValue({
            "name": record.supplierName,
            "email": record.email,
            "phone": record.phoneNumber,
            "address": record.address,
        });
    }

    if (suppliers.length > 0) {
        suppliers.forEach((supplier, index) => {
            data.push({
                key: index,
                supplierId: supplier.supplierId,
                supplierName: supplier.supplierName,
                email: supplier.email,
                phoneNumber: supplier.phoneNumber,
                address: supplier.address,
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
                    rules={[{ required: true, message: 'Please add supplier name!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Supplier name" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: false, message: 'Please input a type!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[{ required: false, message: 'Please input contact!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Contact" />
                </Form.Item>
                <Form.Item
                    name="address"
                    rules={[{ required: false, message: 'Please add supplier name!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Address" />
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
                            Add Supplier
                        </Button>
                    )}
                </Form.Item>
            </Form>
            <br /><br /><br />
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </>
    );
};

export default ManageSupplier;