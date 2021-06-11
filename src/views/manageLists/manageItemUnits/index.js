import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, notification, Table, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import Spinner from '../../../components/spinner';
import useAddMedicine from '../../../state/addMedicine/hooks/useAddMedicine';
import useMedicineSearch from '../../../state/addMedicine/hooks/useSearchMedicine';
import useAddSupplier from '../../../state/pharmacy/hooks/useAddSupplier';
import useGetAllSuppliers from '../../../state/pharmacy/hooks/useGetAllSupplier';
import { deleteItemCategory, deleteItemUnit, getCategoriesList, getItemUnitsList, saveItemCategory, saveItemUnit, saveSupplier } from '../../../state/pharmacy/queries';
import { SERVER_ERROR } from '../../../utils/constantMessages';

const ManageUnits = () => {
    const data = [];
    const [form] = Form.useForm();
    const [selectedRowId, setSelectedRowId] = useState("");
    const [allCategories, setAllCategories] = useState([]);
    // To disable submit button at the beginning.
    useEffect(() => {
        fetchAllCategories();
    }, []);

    function fetchAllCategories() {
        getItemUnitsList().then(data => {
            if (Array.isArray(data)) {
                setAllCategories(data);
            }
        });
    }

    const onFinish = formData => {
        const body = {
            "id": selectedRowId,
            "unitName": formData.unitName,
        };
        saveItemUnit(body).then(data => {
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
            "unitId": "",
            "unitName": ""
        });
    }
    const columns = [
        {
            title: 'Unit Id',
            dataIndex: 'unitId'
        },
        {
            title: 'Unit Name',
            dataIndex: 'unitName',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.unitName - b.unitName,
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
        setSelectedRowId(record.unitId);
        form.setFieldsValue({
            "unitId": record.unitId,
            "unitName": record.unitName
        });
    }
    function deleteCategory(record) {
        deleteItemUnit(record.unitId).then(data => {
            notification["success"]({
                message: 'SUCCESS',
                description: 'Unit deleted successfully',
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
                unitId: category.id,
                unitName: category.unitName,
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
                    name="unitName"
                    rules={[{ required: true, message: 'Please add category name!' }]}
                >
                    <Input placeholder="Unit name" />
                </Form.Item>
                <Form.Item
                    name="unitId"
                >
                    <Input disabled placeholder="Unit Id" />
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
                            Add Unit
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

export default ManageUnits;