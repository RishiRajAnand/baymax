import React, { useState, useEffect } from 'react';
import { Table, Tag, Input, Space, Button, Modal, Select, notification } from 'antd';
import usePatientSearch from '../../state/patientSearch/hooks/usePatientSearch';
import ViewPatientRecords from './components/viewPatientRecords';
import Spinner from '../../components/spinner';
import usePatientById from '../../state/patientSearch/hooks/usePatientSearchbyId';
import PatientDetails from '../patientDetails';
import usePatientByName from '../../state/patientSearch/hooks/usePatientSearchByName';
import { getAppointmentByPatientId } from '../../state/appointment/queries';
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
import { getAllPatients } from '../../state/patientSearch/queries';
import { SERVER_ERROR } from '../../utils/constantMessages';

const { Search } = Input;
const { Option } = Select;
const PatientSearch = ({ history }) => {
    const [filterValue, setfilterValue] = useState("patientName");
    const [isPatientRecordModalVisible, setIsPatientRecordModalVisible] = useState(false);
    const [name, setName] = useState([]);
    const [showPatient, setShowPatient] = useState("all");
    const [patients, setAllPatients] = useState([]);
    const [patientDetails, isLoading1, setPatientSearchbyId] = usePatientById();
    const [currentPatientDetails, setCurrentPatientDetails] = useState({});
    const [currentPatientAppointments, setCurrentPatientAppointments] = useState({});
    const [patientDetailsByName, isLoading2, setPatientSearchbyName] = usePatientByName();
    let data = [];

    useEffect(() => {
        if (showPatient === "all") {
            getAllPatientsList();
        }
    }, [showPatient]);

    function onPatientSearch(searchValue) {
        console.log(searchValue);

        if (searchValue == '') {
            getAllPatientsList();
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
            patientId: patientDetails.patientId,
            patientName: patientDetails.patientName,
            age: patientDetails.age,
            contactNum: patientDetails.contactNum,
            street: patientDetails.street,
            status: ['registered']
        }];
        data = row;
    }

    if (showPatient == "patientName" && patientDetailsByName != null) {
        data = patientDetailsByName.map((patient, index) => {
            return {
                ...patient,
                key: patient.patientId,
                status: ['registered']
            };
        });
    }
    if (showPatient === "all" && patients.length > 0) {
        data = patients.map((patient, index) => {
            return {
                ...patient,
                key: patient.patientId,
                status: ['registered']
            };
        });
    }
    function getAllPatientsList() {
        getAllPatients().then(data => {
            if (data) {
                setAllPatients(data);
            } else {
                notification["error"]({
                    message: 'Error',
                    description: SERVER_ERROR,
                    duration: 3
                });
            }
        }).catch(err => {
            setAllPatients([]);
            notification["error"]({
                message: 'Error',
                description: SERVER_ERROR,
                duration: 3
            });
        });
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'patientName',
            key: 'patientName',
            render: text => <span>{text}</span>,
            sorter: (a, b) => a.patientName.length - b.patientName.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Patient Id',
            dataIndex: 'patientId',
            key: 'patientId',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Phone',
            dataIndex: 'contactNum',
            key: 'contactNum',
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
                        setCurrentPatientDetails(record);
                        getAppointmentByPatientId(record.patientId).then(response => {
                            setCurrentPatientAppointments(response);
                            setIsPatientRecordModalVisible(true);
                        }).catch(err => {
                            notification["error"]({
                                message: 'Error',
                                description: 'Error while searching records with Patient Id' + record.patientId,
                                duration: 3
                            });
                        });
                    }}>
                        View records
                    </Button>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Input.Group compact>
                <Select defaultValue={filterValue} onSelect={setfilterValue}>
                    <Option value="patientName">Patient Name</Option>
                    <Option value="patientId">Patient Id</Option>
                </Select>
                <Input.Search onSearch={onPatientSearch} style={{ width: '70%' }} placeholder="Search by" />
            </Input.Group>
            <br /><br />
            <Table columns={columns} dataSource={data} />
            <Modal title="Patient Records" visible={isPatientRecordModalVisible} footer={null} width={800} onCancel={() => setIsPatientRecordModalVisible(false)} >
                <ViewPatientRecords patientDetails={currentPatientDetails} patientAppointments={currentPatientAppointments} history={history} />
            </Modal>
        </>
    );
};

export default PatientSearch;