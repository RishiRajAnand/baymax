import React, { useState, useEffect } from 'react';
import { Table, Tag, Input, Space, Button, Modal, Descriptions } from 'antd';
import usePatientSearch from '../../state/patientSearch/hooks/usePatientSearch';
import Spinner from '../../components/spinner';

const { Search } = Input;

const PatientSearch = () => {

    const [visible, setVisible] = useState(false);
    const [name, setName] = useState([]);
    const [showPatient, setShowPatient] = useState("all");
    const [patients, isLoading, setRequest] = usePatientSearch();
    // const [patient, isLoading1, setPatientSearchbyId] = usePatientSearchbyId();
    let data = [];

    useEffect(() => {
        if (showPatient === "all") {
            setRequest();
        }
    }, [showPatient]);

    function onPatientSearch(searchValue) {
    }

    if (patients.length > 0) {
        patients.forEach((patient, index) => {
            data.push({
                key: patient.patientId,
                name: patient.patientName,
                age: patient.age,
                phone: patient.contactNum,
                status: ['registered'],
            });
        });
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
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
                    <Button type="primary" onClick={() => {
                        console.log("abhi nhiiiiiiiiiiii");
                        setVisible(true);
                        setName(searches => [record]);
                    }}>
                        View records
                    </Button>
                </Space>
            ),
        },
    ];


    const columnsModal = [
        { title: 'Appointment ID', dataIndex: 'appointmentid', key: 'appointmentid' },
        { title: 'Appointment Date', dataIndex: 'appointmentdate', key: 'appointmentid' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: () => <span>Delete</span>,
        },
    ];

    const dataModal = [
        {
            key: 1,
            appointmentid: '3723823d',
            appointmentdate: "15 Aug",

            description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        },
        {
            key: 2,
            appointmentid: '3723823d',
            appointmentdate: "15 Aug",

            description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
        },
        {
            key: 3,
            appointmentid: '3723823d',
            appointmentdate: "15 Aug",

            description: 'This not expandable',
        },
        {
            key: 4,
            appointmentid: '3723823d',
            appointmentdate: "14 Aug",

            description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
        },
    ];

    return (
        <>
            <Spinner show={isLoading} />
            <Search style={{ width: '30%' }}
                placeholder="Search by Patient Name / ID"
                enterButton="Search"
                size="large"
                onSearch={onPatientSearch}
            />
            <Table columns={columns} dataSource={data} />
            <Modal
                title="Patient Details"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
            >
                {name.map((record, index) =>
                    <>
                        <Descriptions key={index}>
                            <Descriptions.Item label="Name">{record.name}</Descriptions.Item>
                            <Descriptions.Item label="Phone">{record.phone}</Descriptions.Item>
                            <Descriptions.Item label="Age">{record.age}</Descriptions.Item>
                            <Descriptions.Item label="Address">
                                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                            </Descriptions.Item>
                        </Descriptions>
                        <Table
                            columns={columnsModal}
                            expandable={{
                                expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                                rowExpandable: record => record.appointmentdate !== '14 Aug',
                            }}
                            dataSource={dataModal}
                        />
                    </>
                )}
            </Modal>
        </>
    );
};

export default PatientSearch;