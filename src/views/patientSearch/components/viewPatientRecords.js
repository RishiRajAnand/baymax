import React, { } from 'react';
import { Table, Input, Select, Button, Descriptions } from 'antd';
import PatientDetails from '../../patientDetails';
const ViewPatientRecords = (props) => {
    let history = props.history;
    const patientDetails = props.patientDetails;
    let dataModal = [];
    let userDetails = [];
    const columnsModal = [
        { title: 'Appointment ID', dataIndex: 'appointmentId', key: 'appointmentId' },
        { title: 'Appointment Date', dataIndex: 'appointmentDate', key: 'appointmentDate' },
        { title: 'Disease summary', dataIndex: 'diseaseDesc', key: 'diseaseDesc' },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => <Button type="primary" onClick={() => {
                history.push({ pathname: '/home/viewPrescription', search: '?patientId=' + record.patientId + '&doctorId=' + record.doctorId + '&appointmentId=' + record.appointmentId });
            }}>View</Button>,
        },
    ];
    props.patientAppointments.map(data => {
        if (data.status == "done") {
            dataModal.push({ ...data, appointmentDate: (new Date(data.appointmentDate)).toDateString() });
        }
    });
    console.log("patient", patientDetails);
    for (var key of Object.keys(patientDetails)) {
        if (patientDetails[key] && key!= "key") {
            userDetails.push(<Descriptions.Item label={key}>{patientDetails[key]}</Descriptions.Item>);
        }
    }
    // const dataModal = [
    //     {
    //         key: 1,
    //         appointmentid: '3723823d',
    //         appointmentdate: "15 Aug 2020",
    //         description: "The Patient was diagnosed with Viral fever and was discharged after carrying out the tests."
    //     },
    //     {
    //         key: 2,
    //         appointmentid: '3723823d',
    //         appointmentdate: "23 Aug 2020",
    //         description: "The Patient was diagnosed with Viral fever and was discharged after carrying out the tests."
    //     },
    //     {
    //         key: 3,
    //         appointmentid: '3723823d',
    //         appointmentdate: "30 Aug 2020",
    //         description: "The Patient was diagnosed with Viral fever and was discharged after carrying out the tests."
    //     },
    //     {
    //         key: 4,
    //         appointmentid: '3723823d',
    //         appointmentdate: "14 Sep 2020",
    //         description: "The Patient was diagnosed with Viral fever and was discharged after carrying out the tests."
    //     },
    // ];

    return (
        <>
            <Descriptions>
            {userDetails}
            </Descriptions>
            <Table
                columns={columnsModal}
                // expandable={{
                //     expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                //     rowExpandable: record => record.app !== '14 Aug',
                // }}
                dataSource={dataModal}
            />
        </>
    );
};

export default ViewPatientRecords;