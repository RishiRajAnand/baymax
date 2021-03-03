import { Space, Table, Button, Row, Col, Tag, notification } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { getPatientById } from '../../state/patientSearch/queries';
import BillSearchComp from '../billing/components/billSearch';
import { getBillDetails } from '../billing/services';
import { MainBillView } from './components/mainBillView';
import { useReactToPrint } from 'react-to-print';
import { getBillListByDateRange } from '../../state/billing/queries';
import { SERVER_ERROR } from '../../utils/constantMessages';

const BillSearch = ({ history }) => {
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
            filters: [
                {
                    text: 'dues',
                    value: 'dues',
                },
                {
                    text: 'paid',
                    value: 'paid',
                }
            ],
            onFilter: (value, record) => record.paymentStatus == value,
            render: text => (text == 'paid' ? <Tag color='green' key={text}>{text.toUpperCase()}</Tag> : <Tag color='red' key={text}>{text.toUpperCase()}</Tag>)

        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => {
                        history.push({ pathname: '/home/billing', search: '?context=edit' + '&billId=' + record.billId });
                    }}>View/Edit</a>
                    {/* <a onClick={() => {
                        printSingleBill(record);
                    }}>Print</a> */}
                </Space>
            ),
        },
    ];
    const [data, setData] = useState([]);
    const [patientDetails, setPatientDetails] = useState({});
    const [searchCriteria, setSearchFilter] = useState({});
    const [] = useState({});
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
        }).catch(() => {

        });
    }

    function onBillSearch(searchValue, searchFilter) {
        if (searchFilter != "dateRange") {
            getBillDetails(searchValue, searchFilter).then(response => {
                if (response) {
                    setSearchFilter({
                        searchFilter: searchFilter,
                        searchValue: searchValue
                    });
                    if (searchFilter == "patientId") {
                        changePatientdetails(searchValue);
                    }
                    if (response) {
                        const temp = response.map((data, index) => {
                            return {
                                ...data, createdAt: new Date(data.createdAt).toDateString(), key: index
                            }
                        });
                        setData([...temp]);
                    }

                } else {
                    notification["error"]({
                        message: 'Error',
                        description: `No records found for ${searchFilter} ${searchValue}`,
                        duration: 3
                    });
                }
            }).catch(() => {
                notification["error"]({
                    message: 'Error',
                    description: `Error while searching ${searchFilter} ${searchValue}`,
                    duration: 3
                });
            });
        } else {
            getBillListByDateRange(searchValue[1], searchValue[0], 'PHARMACY').then(data => {
                console.log(data);
                if (data) {
                    const temp = data.map((item, index) => {
                        return {
                            ...item, createdAt: new Date(item.createdAt).toDateString(), key: index
                        }
                    });
                    setData([...temp]);
                } else {
                    notification["error"]({
                        message: 'Error',
                        description: `No records found for ${searchFilter}`,
                        duration: 3
                    });
                }
            }).catch(() => {
                notification["error"]({
                    message: 'Error',
                    description: SERVER_ERROR,
                    duration: 3
                });
            });
        }
    }
    return (
        <>
            <div style={{ display: 'none' }}>
                <MainBillView ref={componentRef} billItemList={data} patientDetails={patientDetails} patientId={searchCriteria.searchValue} />
                {/* <BillPrint ref={componentRef} itemList={billPrintData} finalCharges={finalCharges} patientDetails={patientDetails} billId={billDetails.billId} patientId={queryParams.patientId} /> */}
            </div>
            <Row gutter={24}>
                <Col span={10}>
                    <BillSearchComp onSearch={onBillSearch} />
                </Col>
                <Col span={3}>
                    <Button type="primary" onClick={() => { history.push({ pathname: '/home/billing' }) }}>Create New bill</Button>
                </Col>
                <Col span={4}>
                    {mainBillViewButton}
                </Col>
            </Row>
            <br /><br />
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default BillSearch;