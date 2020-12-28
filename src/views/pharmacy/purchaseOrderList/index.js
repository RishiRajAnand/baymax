
import React, { useEffect, useState } from 'react';

import { Table, Tag, Space } from 'antd';
import UseGetAllPurchaseOrder from '../../../state/pharmacy/hooks/UseGetAllPurchaseOrders';

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

const PurchaseOrder = ({ location, history }) => {
    // const data = [];
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
                    <a onClick={() => {
                        history.push({ pathname: '/home/newPurchaseOrder', search: '?mode=edit' + '&purchaseOrderId=' + record.orderId });
                    }}>View</a>
                    <a onClick={() => {
                        history.push({ pathname: '/home/newPurchaseOrder', search: '?mode=edit' + '&purchaseOrderId=' + record.orderId });
                    }}>Cancel</a>
                    {/* <a onClick={() => {
                        history.push({ pathname: '/home/newPurchaseOrder', search: '?patientId=' + record.patientId + '&doctorId=' + record.doctorId + '&appointmentId=' + record.appointmentId });
                    }}>edit</a> */}
                </Space>
            ),
        },
    ];
    const [purchaseOrders, isLoading, setGetAllPurchaseOrder] = UseGetAllPurchaseOrder();
    useEffect(() => {
        setGetAllPurchaseOrder();
    }, []);

    if (purchaseOrders.length > 0) {
        purchaseOrders.map((order, index) => {
            return {
                key: index,
                orderDate: order.orderDate,
                orderId: "bhugat",
                deliveryDate: order.deliveryDate,
                supplier: order.supplier,
                store: order.storeName,
                totalAmount: order.totalAmount,
                status: ['paid']
            };
        });
    }
    return (
        <>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default PurchaseOrder;
