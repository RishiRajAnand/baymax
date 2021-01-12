import React, { useState, useEffect } from 'react';
import { Table, Tag, Input, Space, Button, Modal, Descriptions, Select } from 'antd';
import usePatientSearch from '../../state/patientSearch/hooks/usePatientSearch';
import Spinner from '../../components/spinner';
import usePatientById from '../../state/patientSearch/hooks/usePatientSearchbyId';
import PatientDetails from '../patientDetails';
import usePatientByName from '../../state/patientSearch/hooks/usePatientSearchByName';

const { Search } = Input;
const { Option } = Select;
const PatientSearch = () => {
    const [filterValue, setfilterValue] = useState("patientName");
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState([]);
    const [showPatient, setShowPatient] = useState("all");
    const [patients, isLoading, setRequest] = usePatientSearch();
    const [patientDetails, isLoading1, setPatientSearchbyId] = usePatientById();
    const [patientDetailsByName, isLoading2, setPatientSearchbyName] = usePatientByName();
    let data = [];

    useEffect(() => {
        if (showPatient === "all") {
            setRequest();
        }
    }, [showPatient]);

    function onPatientSearch(searchValue) {
        console.log(searchValue);

        if (searchValue == '') {
            setRequest();
            setShowPatient("all");
        } else if (filterValue == "patientId") {
            setPatientSearchbyId(searchValue);
            setShowPatient("patientId");
        } else if (filterValue == "patientName") {
            setPatientSearchbyName(searchValue);
            setShowPatient("patientName");
        }

    }
    if (showPatient == "patientId" && patientDetails != null) {
        const row = [{
            key: patientDetails.patientId,
            name: patientDetails.patientName,
            age: patientDetails.age,
            phone: patientDetails.contactNum,
            address: patientDetails.street,
            status: ['registered']
        }];
        data = row;
    }

    if (showPatient == "patientName" && patientDetailsByName != null) {
        data = patientDetailsByName.map((patient, index) => {
            return {
                key: patient.patientId,
                name: patient.patientName,
                age: patient.age,
                phone: patient.contactNum,
                address: patient.street,
                status: ['registered'],
            };
        });
    }
    if (showPatient === "all" && patients.length > 0) {
        data = patients.map((patient, index) => {
            return {
                key: patient.patientId,
                name: patient.patientName,
                age: patient.age,
                phone: patient.contactNum,
                address: patient.street,
                status: ['registered'],
            };
        });
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend'],
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
            filters: [
                {
                    text: 'Registered',
                    value: 'registered',
                },
                {
                    text: 'Discharged',
                    value: 'discharged',
                },
            ],
            onFilter: (value, record) => record.status == value,
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
            render: () => <span>View</span>,
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
            <Input.Group compact>
                <Select defaultValue={filterValue} onSelect={setfilterValue}>
                    <Option value="patientName">Patient Name</Option>
                    <Option value="patientId">Patient Id</Option>
                </Select>
                <Input.Search onSearch={onPatientSearch} style={{ width: '70%' }} placeholder="Search by" />
            </Input.Group>
            <br /><br />
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
                                {record.address}
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