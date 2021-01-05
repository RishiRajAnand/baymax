import { Button, Calendar, Card, Col, Divider, notification, Row, Select, Input, Form } from 'antd';
import moment from 'moment';
import queryString from 'query-string';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import useBookAppointment from '../../state/appointment/hooks/useBookAppointment';
import useGetAllDoctorByDepartment from '../../state/patientSearch/hooks/useGetAllDoctorByDepartment';
import useGetAllDoctors from '../../state/patientSearch/hooks/useGetAllDoctors';
import usePatientSearchbyId from '../../state/patientSearch/hooks/usePatientSearchbyId';
import { departments } from '../../utils/departmentList';
import '../appointment/appointment.css';
import PatientDetails from '../patientDetails';
import timeSlot from '../../utils/timeSlot';
import { AppointmentCardPrint } from './components/appointmentCardPrint';
const { Option } = Select;
const { Search } = Input;

function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}

const department = departments.map(department => <Option key={department}>{department}</Option>);

const Appointment = ({ location, history }) => {
    let doctorsList = [];
    let timeSlots = [];
    let appointmentDetails = {
        patientName: '',
        doctorName: '',
        dateAndTime: '',
        department: ''
    };
    // let selectedDoctor = "";
    const map = new Map();
    const queryParams = queryString.parse(location.search);
    const [selectedDepartment, setSelectedDepartment] = useState("all");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const componentRef = useRef();
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [doctors, isLoading, setRequest] = useGetAllDoctors();
    const [patientDetails, isLoading2, setPatientSearchById] = usePatientSearchbyId();
    const [doctorBydepartment, isLoadings, callDoctorByDepartment] = useGetAllDoctorByDepartment();
    const [status, isLoading1, setBookAppointment] = useBookAppointment();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    useEffect(() => {
        if (selectedDepartment === "all") {
            setRequest();
            if (queryParams.patientId != null) {
                setPatientSearchById(queryParams.patientId);
            } else {
                setPatientSearchById(patientDetails.patientId);
            }


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
        setSelectedDepartment(value);
    }
    function onDateSelect(value) {
        setSelectedDate(new Date(value));
    }

    function handleChangeOfDoctor(value) {
        // selectedDoctor = value;
        setSelectedDoctor(value);
    }

    function bookAppointment() {
        const body = {
            "diseaseDesc": "test desc",
            "advise": "test",
            "patientId": patientDetails.patientId,
            "patientName": patientDetails.patientName,
            "doctorId": selectedDoctor,
            "appointmentDate": selectedDate.getTime(),
            "height": 6,
            "weight": 80,
            "Bp": "120/80"
        };
        if (patientDetails.patientId != null) {
            setBookAppointment(body);
        } else {
            notification["error"]({
                message: 'Failed',
                description: 'Please Enter a valid patient Id!',
                duration: 3
            });
        }

    }
    let MainButton = "";
    let appointmentCard = "";
    if (!status) {
        MainButton = <Button type="primary" size="large" htmlType="submit">Book Appointment</Button>;
    } else {
        console.log("dsadsad" + selectedDoctor);
        MainButton = <Button type="primary" size="large" onClick={() => {
            console.log(patientDetails.patientId,);
            history.push({ pathname: '/home/billing', search: '?patientId='.concat(patientDetails.patientId) + '&doctorName=' + map.get(selectedDoctor).doctorName + '&charges=' + map.get(selectedDoctor).consulationCharge + '&context=consulation' })
        }}>Go To Billing</Button>;
        appointmentDetails = {
            patientName: patientDetails.patientName,
            doctorName: map.get(selectedDoctor).doctorName,
            dateAndTime: selectedDate.toDateString(),
            department: selectedDepartment
        };
        appointmentCard = (<Card title="Appointment Details" extra={<a href="#" onClick={handlePrint}>Print</a>} style={{ width: 300 }}>
            <p>Appointment booked for :</p>
            <p>{patientDetails.patientName}</p>
            <p>on {selectedDate.toDateString()}</p>
            <p>At {selectedDepartment}</p>
            <p>With Dr. {map.get(selectedDoctor).doctorName}</p>
        </Card>);
    }

    timeSlots = timeSlot(new Date(), 2, 4, 15).map(val => <Option key={val} >val</Option>);
    const onPatientSearch = value => {
        setPatientSearchById(value);
    };
    return (
        <>
            <Search
                placeholder="Search Patient By Id"
                allowClear
                enterButton="Search"
                size="large"
                style={{ width: '40%' }}
                onSearch={onPatientSearch}
            />
            <br />
            <PatientDetails patientId={patientDetails.patientId} />
            <br></br>
            <Divider>Appointment Booking</Divider>
            <Form name="nest-messages" onFinish={bookAppointment}>
                <Row>
                    <Col span={8}>
                        <div className="site-calendar-demo-card">
                            <Calendar fullscreen={false} onSelect={onDateSelect} disabledDate={disabledDate} />
                        </div>
                    </Col>
                    <Col span={8}>
                        <Form.Item name={['user', 'departmentName']}>
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
                        </Form.Item>
                        <br /><br /><br />
                        <Form.Item name={['user', 'doctorName']} rules={[{ required: true }]}>
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
                        </Form.Item>

                        <br /><br /><br />
                        <Form.Item name={['user', 'timeSlot']}>
                            <Select placeholder="Select Time Slot" style={{ width: 300 }}>
                                {timeSlots}
                                {/* <Option value="jack">11:30 - 11:45</Option>
                                <Option value="jack1">11:30 - 11:45</Option>
                                <Option value="jack2">11:30 - 11:45</Option>
                                <Option value="jack3">11:30 - 11:45</Option>
                                <Option value="jack4">11:30 - 11:45</Option>
                                <Option value="jack5">11:30 - 11:45</Option> */}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <div style={{ display: 'none' }}>
                            <AppointmentCardPrint ref={componentRef} appointmentDetails={appointmentDetails} />
                        </div>
                        {appointmentCard}
                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={10}>
                        {MainButton}
                    </Col>
                </Row>
            </Form>
        </>);
};

export default Appointment;
