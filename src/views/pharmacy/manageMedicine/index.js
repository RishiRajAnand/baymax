import React, { useEffect, useState } from 'react';

import { Table, Tag, Space } from 'antd';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        filters: [
            {
                text: 'Aspirin',
                value: 'aspirin',
            },
            {
                text: 'Painkillers',
                value: 'painkiller',
            }
        ],
        onFilter: (value, record) => record.category.indexOf(value) === 0,
        sorter: (a, b) => a.category.length - b.category.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Purchase Price',
        dataIndex: 'purchasePrice',
        key: 'purchasePrice',
    },
    {
        title: 'Selling Price',
        dataIndex: 'sellingPrice',
        key: 'sellingPrice',
    },
    {
        title: 'Generic name',
        dataIndex: 'genericName',
        key: 'genericName',
    },
    {
        title: 'Expiry date',
        dataIndex: 'expiryDate',
        key: 'expiryDate',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Place Order</a>
                <a>Stock</a>
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        name: '',
        category: '',
        purchasePrice: '',
        sellingPrice: '',
        genericName: '',
        expiryDate: '',
    },
    {
        key: '2',
        name: '',
        category: '',
        purchasePrice: '',
        sellingPrice: '',
        genericName: '',
        expiryDate: '',

    },
    {
        key: '3',
        name: '',
        category: '',
        purchasePrice: '',
        sellingPrice: '',
        genericName: '',
        expiryDate: '',

    },
];

const ManageMedicines = () => {
    return (
        <>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default ManageMedicines;