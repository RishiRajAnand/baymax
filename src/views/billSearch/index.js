import { Space, Table, Input, Select, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import useBillSearch from '../../state/billing/hooks/useBillSearch';
import BillSearchComp from '../billing/components/billSearch';
import { getBillDetails } from '../billing/services';
const { Search } = Input;
const { Option } = Select;

const BillSearch = ({ location, history }) => {
    const columns = [
        {
            title: 'Bill Id',
            dataIndex: 'billId',
            key: 'billId',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Patient Id',
            dataIndex: 'patientId',
            key: 'patientId'
        },
        {
            title: 'Bill Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Bill Total',
            dataIndex: 'totalCost',
            key: 'totalCost',
        },
        {
            title: 'Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => {
                        history.push({ pathname: '/home/billing', search: '?context=edit' + '&billId=' + record.billId });
                    }}>View/Edit</a>
                    <a onClick={() => {
                    }}>Print</a>
                </Space>
            ),
        },
    ];
    const [data, setData] = useState([]);
    useEffect(() => {
        // 
    }, []);

    function onBillSearch(searchValue, searchFilter) {
        getBillDetails(searchValue, searchFilter).then(response => {
            if (response) {
                setData([...response]);
            }
        }).catch(err => {
            notification["error"]({
                message: 'Error',
                description: `Error while searching ${searchFilter} ${searchValue}`,
                duration: 3
            });
        });
    }
    return (
        <>
            <BillSearchComp onSearch={onBillSearch} />
            <br /><br />
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default BillSearch;