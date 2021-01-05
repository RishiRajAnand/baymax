import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import useGetPrescriptionByAppointmentId from '../../../state/prescription/hooks/useGetPrescriptionByAppointmentId';
import queryString from 'query-string';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    },
];

const ViewPrescription = ({ location, history }) => {
    const queryParams = queryString.parse(location.search);
    const [prescriptionDetails, setPrescriptionDetails] = useGetPrescriptionByAppointmentId();
    useEffect(() => {
        setPrescriptionDetails(queryParams.appointmentId);
    }, []);

    if (prescriptionDetails != null) {
        console.log(prescriptionDetails);
    }
    return (
        <>
            <h4>Prescribed Medicines</h4>
            <Table columns={columns} dataSource={data} size="middle" />
            <hr />
            <h4>Prescribed Tests</h4>
            <Table columns={columns} dataSource={data} size="middle" />
            <hr />
        </>

    );
};

export default ViewPrescription;