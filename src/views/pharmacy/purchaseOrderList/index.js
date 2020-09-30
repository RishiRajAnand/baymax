
import React, { useEffect, useState } from 'react';

import { Table, Tag, Space } from 'antd';

const columns = [
    {
        title: 'Order Date',
        dataIndex: 'orderDate',
        key: 'orderDate',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Delivery Date',
        dataIndex: 'deliveryDate',
        key: 'deliveryDate',
    },
    {
        title: 'Supplier',
        dataIndex: 'supplier',
        key: 'supplier',
    },
    {
        title: 'Store',
        dataIndex: 'store',
        key: 'store',
    },
    {
        title: 'Total Amount',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: tags => (
            <>
                {tags.map(tag => {
                    return (
                        <Tag color="green" key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>view</a>
                <a>edit</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        orderDate: '',
        deliveryDate: '',
        supplier: '',
        store: '',
        totalAmount: '',
        status: ['paid']
    },
    {
        key: '2',
        orderDate: '',
        deliveryDate: '',
        supplier: '',
        store: '',
        totalAmount: '',
        status: ['paid']

    },
    {
        key: '3',
        orderDate: '',
        deliveryDate: '',
        supplier: '',
        store: '',
        totalAmount: '',
        status: ['paid']

    },
];

const PurchaseOrder = () => {
    return (
        <>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default PurchaseOrder;
