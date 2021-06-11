import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, notification, Table, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import Spinner from '../../../components/spinner';
import useAddMedicine from '../../../state/addMedicine/hooks/useAddMedicine';
import useMedicineSearch from '../../../state/addMedicine/hooks/useSearchMedicine';
import useAddSupplier from '../../../state/pharmacy/hooks/useAddSupplier';
import useGetAllSuppliers from '../../../state/pharmacy/hooks/useGetAllSupplier';
import { deleteItemCategory, getCategoriesList, saveItemCategory, saveSupplier } from '../../../state/pharmacy/queries';
import { SERVER_ERROR } from '../../../utils/constantMessages';

const ManageCategories = () => {
    const data = [];
    const [form] = Form.useForm();
    const [selectedRowId, setSelectedRowId] = useState("");
    const [allCategories, setAllCategories] = useState([]);
    // To disable submit button at the beginning.
    useEffect(() => {
        fetchAllCategories();
    }, []);

    function fetchAllCategories() {
        getCategoriesList().then(data => {
            if (Array.isArray(data)) {
                setAllCategories(data);
            }
        });
    }

    const onFinish = formData => {
        const body = {
            "categoryId": selectedRowId,
            "categoryName": formData.categoryName,
        };
        saveItemCategory(body).then(data => {
            notification["success"]({
                message: 'SUCCESS',
                description: 'Category added successfully',
                duration: 3
            });
            fetchAllCategories();
            clearForm();
        }).catch(err => {
            notification["error"]({
                message: 'ERROR',
                description: SERVER_ERROR,
                duration: 3
            });
        });
    };
    function clearForm() {
        setSelectedRowId(null);
        form.setFieldsValue({
            "categoryId": "",
            "categoryName": ""
        });
    }
    const columns = [
        {
            title: 'Category Id',
            dataIndex: 'categoryId'
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.categoryName - b.categoryName,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => editCategory(record)}>Edit</a>
                    <a onClick={() => deleteCategory(record)}>Delete</a>
                </Space>
            ),
        }
    ];

    function editCategory(record) {
        console.log(record);
        setSelectedRowId(record.categoryId);
        form.setFieldsValue({
            "categoryId": record.categoryId,
            "categoryName": record.categoryName
        });
    }
    function deleteCategory(record) {
        deleteItemCategory(record.categoryId).then(data => {
            notification["success"]({
                message: 'SUCCESS',
                description: 'Category deleted successfully',
                duration: 3
            });
            fetchAllCategories();
            clearForm();
        }).catch(err => {
            notification["error"]({
                message: 'ERROR',
                description: SERVER_ERROR,
                duration: 3
            });
    });
}

    if (allCategories.length > 0) {
        allCategories.forEach((category, index) => {
            data.push({
                key: index,
                categoryId: category.categoryId,
                categoryName: category.categoryName,
            });
        });
    }

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    return (
        <>
            <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
                <Form.Item
                    name="categoryName"
                    rules={[{ required: true, message: 'Please add category name!' }]}
                >
                    <Input placeholder="Category name" />
                </Form.Item>
                <Form.Item
                    name="categoryId"
                >
                    <Input disabled placeholder="Category Id" />
                </Form.Item>
                <Form.Item shouldUpdate={true}>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={
                                // !form.isFieldsTouched(true) ||
                                form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Add Category
                        </Button>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={clearForm}> Clear form </Button>
                </Form.Item>
            </Form>
            <br /><br /><br />
            <Table columns={columns} dataSource={data} onChange={onChange} />
        </>
    );
};

export default ManageCategories;