import { Space, Table, Button, Input, Row, Col, Select, notification } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import useBillSearch from '../../state/billing/hooks/useBillSearch';
import { getPatientById } from '../../state/patientSearch/queries';
import BillSearchComp from '../billing/components/billSearch';
import { getBillDetails } from '../billing/services';
import { MainBillView } from './components/mainBillView';
import { useReactToPrint } from 'react-to-print';
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
    const [patientDetails, setPatientDetails] = useState({});
    const [searchCriteria, setSearchFilter] = useState({});
    let mainBillViewButton = "";
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    useEffect(() => {
        // 
    }, []);

    if (searchCriteria.searchFilter == "patientId") {
        console.log(searchCriteria);
        mainBillViewButton = <Button type="primary" onClick={viewMainBill}>View Main Bill</Button>;
    }

    function viewMainBill() {
        handlePrint();
    }
    function changePatientdetails(patientId) {
        getPatientById(patientId).then(patientDetails => {
            setPatientDetails(patientDetails);
        }).catch(err => {

        });
    }

    function onBillSearch(searchValue, searchFilter) {
        getBillDetails(searchValue, searchFilter).then(response => {
            if (response) {
                setSearchFilter({
                    searchFilter: searchFilter,
                    searchValue: searchValue
                });
                if (searchFilter == "patientId") {
                    changePatientdetails(searchValue);
                }

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
            <div style={{ display: 'none' }}>
                {/* <BillPrint ref={componentRef} itemList={data} finalCharges={finalCharges} patientDetails={patientDetails} billId={billDetails.billId} patientId={queryParams.patientId} /> */}
                <MainBillView ref={componentRef} billItemList={data} patientDetails={patientDetails} patientId={searchCriteria.searchValue} />
            </div>
            <Row gutter={24}>
                <Col span={12}>
                    <BillSearchComp onSearch={onBillSearch} />
                </Col>
                <Col span={12}>
                    {mainBillViewButton}
                </Col>
            </Row>
            <br /><br />
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default BillSearch;