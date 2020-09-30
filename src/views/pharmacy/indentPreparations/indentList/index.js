import React, { useEffect, useState } from 'react';

import { Table, Tag, Space } from 'antd';

const columns = [
    {
        title: 'Patient Reg No',
        dataIndex: 'regNo',
        key: 'regNo',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Patient Name',
        dataIndex: 'patientName',
        key: 'patientName',
    },
    {
        title: 'Indent Date and Time',
        dataIndex: 'indentDate',
        key: 'indentDate',
    },
    {
        title: 'Submitted By',
        dataIndex: 'submittedBy',
        key: 'submittedBy',
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

const IndentList = () => {
    return (
        <>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default IndentList;
