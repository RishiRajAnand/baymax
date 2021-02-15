import React, { } from 'react';
import { Table, Input, Select, Button } from 'antd';
const ViewPatientRecords = (props) => {
    let history = props.history;
    let dataModal = [];
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
            <Table
                columns={columnsModal}
                expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                    rowExpandable: record => record.app !== '14 Aug',
                }}
                dataSource={dataModal}
            />
        </>
    );
};

export default ViewPatientRecords;