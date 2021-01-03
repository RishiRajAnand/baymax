
import React, { useEffect, useState } from 'react';

import { Table, Tag, Space, notification } from 'antd';
import UseGetAllPurchaseOrder from '../../../state/pharmacy/hooks/UseGetAllPurchaseOrders';
import useDeletePurchaseOrder from '../../../state/pharmacy/hooks/useDeletePurchaseOrder';

// const data = [
//     {
//         key: '1',
//         orderDate: '',
//         deliveryDate: '',
//         supplier: '',
//         store: '',
//         totalAmount: '',
//         status: ['paid']
//     },
//     {
//         key: '2',
//         orderDate: '',
//         deliveryDate: '',
//         supplier: '',
//         store: '',
//         totalAmount: '',
//         status: ['paid']

//     },
//     {
//         key: '3',
//         orderDate: '',
//         deliveryDate: '',
//         supplier: '',
//         store: '',
//         totalAmount: '',
//         status: ['paid']

//     },
// ];

const PurchaseOrder = ({ location, history }) => {
    let data = [];
    const columns = [
        {
            title: 'Invoice No.',
            dataIndex: 'invoiceNumber',
            key: 'orderDate',
            render: text => <a>{text}</a>,
        },
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
                        history.push({ pathname: '/home/newPurchaseOrder', search: '?mode=edit' + '&purchaseOrderId=' + record.purchaseOrderId });
                    }}>View</a>
                    <a onClick={() => deletePurchaseOrder(record)}>Cancel</a>
                    {/* <a onClick={() => {
                        history.push({ pathname: '/home/newPurchaseOrder', search: '?patientId=' + record.patientId + '&doctorId=' + record.doctorId + '&appointmentId=' + record.appointmentId });
                    }}>edit</a> */}
                </Space>
            ),
        },
    ];
    const [purchaseOrders, isLoading, setGetAllPurchaseOrder] = UseGetAllPurchaseOrder();
    const [status, setDeletePurchaseOrder] = useDeletePurchaseOrder();
    useEffect(() => {
        if (status) {
            notification["success"]({
                message: 'SUCCESS',
                description: 'Purchase order created successfully',
                duration: 3
            });
        }
        setGetAllPurchaseOrder();
    }, []);

    function deletePurchaseOrder(record) {
        const body = {
            purchaseOrderId: record.purchaseOrderId,
            supplierName: null,
            orderDate: null,
            storeName: null,
            // totalAmount: null,
            deliveryDate: null,
            rol: null,
            productDetails: null,
        };
        setDeletePurchaseOrder(body);
    }
    if (purchaseOrders.length > 0) {
        data = purchaseOrders.map((order, index) => {
            return {
                key: index,
                purchaseOrderId: order.purchaseOrderId,
                orderDate: (new Date(order.orderDate)).toDateString(),
                deliveryDate: order.deliveryDate,
                supplier: order.supplierName,
                store: order.storeName,
                // totalAmount: order.totalAmount,
                status: ['order placed']
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
