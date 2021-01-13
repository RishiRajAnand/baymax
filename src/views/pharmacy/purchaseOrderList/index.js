
import React, { useEffect, useState } from 'react';

import { Table, Tag, Space, notification, Input, Select } from 'antd';
import UseGetAllPurchaseOrder from '../../../state/pharmacy/hooks/UseGetAllPurchaseOrders';
import useDeletePurchaseOrder from '../../../state/pharmacy/hooks/useDeletePurchaseOrder';
import { getRenderPropValue } from 'antd/lib/_util/getRenderPropValue';
const { Search } = Input;
const { Option } = Select;
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

function resolveTag(tag) {
    if (tag == "cancelled") {
        return "red";
    } else if (tag == "orderPlaced") {
        return "orange";
    } else {
        return "green";
    }

}
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
            sorter: (a, b) => a.orderDate - b.orderDate,
        },
        {
            title: 'Delivery Date',
            dataIndex: 'deliveryDate',
            key: 'deliveryDate',
            sorter: (a, b) => a.deliveryDate - b.deliveryDate,
        },
        {
            title: 'Supplier',
            dataIndex: 'supplier',
            key: 'supplier',
            filters: [
                {
                    text: 'ACME',
                    value: 'cancelled',
                },
                {
                    text: 'GSK',
                    value: 'delivered',
                }, {
                    text: 'Medimex',
                    value: 'orderPlaced',
                },
            ],
            onFilter: (value, record) => record.supplier == value,
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
                            <Tag color={resolveTag(tag)} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
            filters: [
                {
                    text: 'Cancelled',
                    value: 'cancelled',
                },
                {
                    text: 'Discharged',
                    value: 'delivered',
                }, {
                    text: 'Order Placed',
                    value: 'orderPlaced',
                },
            ],
            onFilter: (value, record) => record.status == value,
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
    const [filterValue, setfilterValue] = useState("invoiceNumber");
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
                totalAmount: order.totalAmount,
                status: (order.status != null ? [order.status] : ['Order Placed'])
            };
        });
    }
    function onOrderSearch(searchValue) {

        if (searchValue == '') {
            // setRequest();
            // // setShowPatient("all");
        } else if (filterValue == "invoiceNumber") {
            // setPatientSearchbyId(searchValue);
            // setShowPatient("patientId");
        } else if (filterValue == "supplierName") {
            // setPatientSearchbyName(searchValue);
            // setShowPatient("patientName");
        }

    }
    return (
        <>
            <Input.Group compact>
                <Select defaultValue={filterValue} onSelect={setfilterValue}>
                    <Option value="invoiceNumber">Invoice Number</Option>
                    <Option value="supplierName">Supplier</Option>
                    {/* <Option value="SupplierName">Supplier Name</Option> */}
                </Select>
                <Input.Search onSearch={onOrderSearch} style={{ width: '70%' }} placeholder="Search by" />
            </Input.Group>
            <br /><br />
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default PurchaseOrder;
