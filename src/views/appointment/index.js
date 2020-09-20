import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Calendar, Select, Row, Col, Button, Card, Divider, Descriptions, Badge, notification } from 'antd';
import useGetAllDoctors from '../../state/patientSearch/hooks/useGetAllDoctors';
import '../appointment/appointment.css';
import useGetAllDoctorByDepartment from '../../state/patientSearch/hooks/useGetAllDoctorByDepartment';
import { departments } from '../../utils/departmentList';
import PatientDetails from '../patientDetails';
import queryString from 'query-string';
import useBookAppointment from '../../state/appointment/hooks/useBookAppointment';

const { Option } = Select;

function onPanelChange(value, mode) {
    console.log(value, mode);
}
function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}

const department = departments.map(department => <Option key={department}>{department}</Option>);

const Appointment = ({ location, history }) => {
    let doctorsList = [];
    // let selectedDoctor = "";
    const map = new Map();
    const queryParams = queryString.parse(location.search);
    const [selectedDepartment, setSelectedDepartment] = useState("all");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [doctors, isLoading, setRequest] = useGetAllDoctors();
    const [doctorBydepartment, isLoadings, callDoctorByDepartment] = useGetAllDoctorByDepartment();
    const [status, isLoading1, setBookAppointment] = useBookAppointment();
    useEffect(() => {
        if (selectedDepartment === "all") {
            setRequest();
        } else {
            callDoctorByDepartment(selectedDepartment);
        }
        if (status) {
            notification["success"]({
                message: 'SUCCESS',
                description: 'Appointment successfully booked for patient with id ' + queryParams.patientId + 'and Doctor ' + selectedDoctor,
                duration: 3
            });
        }
    }, [selectedDepartment, status]);

    console.log("doctor by department", doctorBydepartment);

    if (selectedDepartment !== "all") {
        if (doctorBydepartment.length > 0) {
            doctorsList = doctorBydepartment.map(doctor => {
                map.set(doctor.doctorId, doctor);
                return <Option key={doctor.doctorId} >{doctor.doctorName}</Option>;
            });
        }
    } else {
        if (doctors.length > 0) {
            doctorsList = doctors.map(doctor => {
                map.set(doctor.doctorId, doctor);
                return <Option key={doctor.doctorId} >{doctor.doctorName}</Option>
            });
        }
    }
    function handleChange(value) {
        console.log(`selected ${value}`);
        setSelectedDepartment(value);
    }

    function handleChangeOfDoctor(value) {
        // selectedDoctor = value;
        setSelectedDoctor(value);
    }

    function bookAppointment() {
        const body = {
            "diseaseDesc": "test desc",
            "advise": "test",
            "patientId": queryParams.patientId,
            "patientName": queryParams.patientId,
            "doctorId": selectedDoctor,
            "height": 6,
            "weight": 80,
            "Bp": "120/80"
        };
        setBookAppointment(body);
    }
    let MainButton = "";
    let appointmentCard = "";
    if (!status) {
        MainButton = <Button type="primary" size="large" onClick={bookAppointment}>Book Appointment</Button>;
    } else {
        console.log("dsadsad" + selectedDoctor);
        MainButton = <Button type="primary" size="large" onClick={() => {
            history.push({ pathname: '/home/billing', search: '?patientId='.concat(queryParams.patientId) + '&doctorName=' + map.get(selectedDoctor).doctorName + '&charges=' + map.get(selectedDoctor).consulationCharge + '&context=consulation' })
        }}>Go To Billing</Button>;
        appointmentCard = (<Card title="Appointment Details" extra={<a href="#">Print</a>} style={{ width: 300 }}>
            <p>Appointment booked for :</p>
            <p>Rishiraj Anand</p>
            <p>on 9 PM Aug, 11: 14 AM</p>
            <p>At {selectedDepartment}</p>
            <p>With {map.get(selectedDoctor).doctorName}</p>
        </Card>);
    }
    return (
        <>
            <PatientDetails patientId={queryParams.patientId} />
            <br></br>
            <Divider>Appointment Booking</Divider>
            <Row>
                <Col span={8}>
                    <div className="site-calendar-demo-card">
                        <Calendar fullscreen={false} onPanelChange={onPanelChange} disabledDate={disabledDate} />
                    </div>
                </Col>
                <Col span={8}>
                    <Select
                        showSearch
                        defaultValue="all"
                        onChange={handleChange}
                        placeholder="Select Department" style={{ width: 300 }}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        <Option value="all">All</Option>
                        {department}
                    </Select>
                    <br /><br /><br />
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
                    <br /><br /><br />
                    <Select placeholder="Select Time Slot" style={{ width: 300 }}>
                        <Option value="jack">11:30 - 11:45</Option>
                        <Option value="jack1">11:30 - 11:45</Option>
                        <Option value="jack2">11:30 - 11:45</Option>
                        <Option value="jack3">11:30 - 11:45</Option>
                        <Option value="jack4">11:30 - 11:45</Option>
                        <Option value="jack5">11:30 - 11:45</Option>
                    </Select></Col>
                <Col span={8}>
                    {appointmentCard}
                </Col>
            </Row>
            <Row>
                <Col span={12} offset={10}>
                    {MainButton}
                </Col>
            </Row>
        </>);
};

export default Appointment;
