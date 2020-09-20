import React, { useState, useEffect } from 'react';
import { Table, Tag, DatePicker, Button, TimePicker, Select, Space } from 'antd';
import usePatientSearch from '../../state/patientSearch/hooks/usePatientSearch';
import useGetAllDoctors from '../../state/patientSearch/hooks/useGetAllDoctors';
import useGetAppointmentByDoctorId from '../../state/appointment/hooks/useGetAppointmentsByDoctorId';
const { Option } = Select;

function PickerWithType({ type, onChange }) {
    if (type === 'time') return <TimePicker onChange={onChange} />;
    if (type === 'date') return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
}

function DoctorAppointment({ location, history }) {
    let doctorsList = [];
    const [type, setType] = useState('time');
    const [selectedDoctor, setSelectedDoctor] = useState("initial");
    const [doctors, isLoading, setRequest] = useGetAllDoctors();
    const [appointments, isLoading1, setAppointmentByDoctorId] = useGetAppointmentByDoctorId();
    let data = [];
    useEffect(() => {
        if (selectedDoctor === "initial") {
            setRequest();
            setAppointmentByDoctorId(selectedDoctor)
        } else {
            setAppointmentByDoctorId(selectedDoctor);
        }
    }, [selectedDoctor]);

    if (doctors.length > 0) {
        doctorsList = doctors.map(doctor => <Option key={doctor.doctorId} >{doctor.doctorName}</Option>);
    }
    console.log("asadada", appointments);
    if (appointments.length > 0) {
        data = appointments.map(appointment => {
            return {
                key: appointment.appointmentId,
                patientName: appointment.patientName,
                appointmentId: appointment.appointmentId,
                doctorId: appointment.doctorId,
                patientId: appointment.patientId,
                status: ['registered']
            };
        });
    }

    function handleChangeOfDoctor(value) {
        setSelectedDoctor(value);
    }

    const columns = [
        {
            title: 'Patient Name',
            dataIndex: 'patientName',
            key: 'patientName',
            render: text => <span>{text}</span>,
        },
        // {
        //     title: 'Age/Gender',
        //     dataIndex: 'age',
        //     key: 'age',
        // },
        {
            title: 'Time Slot',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: tags => (
                <>
                    {tags.map(tag => {
                        return (
                            <Tag color="green" key={tag}>
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
                        history.push({ pathname: '/home/prescription', search: '?patientId=' + record.patientId + '&doctorId=' + record.doctorId + '&appointmentId=' + record.appointmentId });
                    }}>
                        Proceed
                </Button>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Space>
                <Select
                    onChange={handleChangeOfDoctor}
                    showSearch
                    placeholder="Select Doctor" style={{ width: 300 }}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {doctorsList}
                </Select>
                <Select value={type} onChange={setType}>
                    <Option value="time">Time</Option>
                    <Option value="date">Date</Option>
                    <Option value="week">Week</Option>
                    <Option value="month">Month</Option>
                    <Option value="quarter">Quarter</Option>
                    <Option value="year">Year</Option>
                </Select>
                <PickerWithType type={type} onChange={value => console.log(value)} />
            </Space>
            <Table columns={columns} dataSource={data} />
        </>
    );
}

export default DoctorAppointment;