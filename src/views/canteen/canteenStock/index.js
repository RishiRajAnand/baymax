import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, InputNumber, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;
const defaultCategories = ['Meals', 'Drinks', 'Snacks', 'Chinese', 'South Indian'];
const columns = [
    {
        title: 'Item Name',
        dataIndex: 'itemName',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.itemName - b.itemName,
    },
    {
        title: 'Price',
        dataIndex: 'price'
    },
    {
        title: 'Category',
        dataIndex: 'category',
        filters: defaultCategories.map(cat => {
            return {
                text: cat,
                value: cat,
            }
        }),
        onFilter: (value, record) => record.category.indexOf(value) === 0,
        sorter: (a, b) => a.category.length - b.category.length,
        sortDirections: ['descend'],
    }
];

const CanteenStock = () => {
    let index = 0;
    const data = [];
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    const [name, setName] = useState("");
    const [items, setItems] = useState(['Meals', 'Drinks', 'Snacks', 'Chinese', 'South Indian']);

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = values => {
        console.log('Finish:', values);
    };
    function onNameChange(event) {
        // console.log("sas", event.target.value);
        setName(event.target.value);
    };
    function addItem() {
        setName('');
        setItems([...items, name || `New item ${index++}`]);
    }

    return (
        <>
            <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
                <Form.Item
                    name="itemName"
                    rules={[{ required: true, message: 'Please enter item name!' }]}
                >
                    <Input placeholder="Item Name" />
                </Form.Item>
                <Form.Item
                    name="price"
                    rules={[{ required: true, message: 'Please enter a price!' }]}
                >
                    <InputNumber placeholder="Price" />
                </Form.Item>
                <Form.Item
                    name="Category"
                >
                    <Select
                        style={{ width: 240 }}
                        placeholder="Select category"
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
                            Add Item
                        </Button>
                    )}
                </Form.Item>
            </Form>
            <br /><br /><br />
            <Table columns={columns} dataSource={data} />
        </>
    );
};


export default CanteenStock;
