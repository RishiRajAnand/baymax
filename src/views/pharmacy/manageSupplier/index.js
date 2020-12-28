import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, notification, Table } from 'antd';
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
    const [status, setRequest] = useAddSupplier();
    const [medicines, isLoadings, setMedicineSearch] = useGetAllSuppliers();
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
        if (medicines.length === 0) {
            setMedicineSearch();
        }
        // forceUpdate({});
    }, [status]);
    console.log("medicines list", medicines);
    const onFinish = form => {
        const body = {
            "supplierName": form.name,
            "email": form.email,
            "phoneNumber": form.phone,
            "address": form.address,
        };
        setRequest(body);
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
            <Spinner show={isLoadings} />
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