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
        timeSlot: '',
        department: ''
    };
    // let selectedDoctor = "";
    const map = new Map();
    const queryParams = queryString.parse(location.search);
    const [selectedDepartment, setSelectedDepartment] = useState("all");
    const [form] = Form.useForm();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const componentRef = useRef();
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

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
    function handleChangeOfTimeSlot(value) {
        // selectedDoctor = value;
        setSelectedTimeSlot(value);
    }

    function bookAppointment(formData) {
        const body = {
            "diseaseDesc": "test desc",
            "advise": "test",
            "patientId": patientDetails.patientId,
            "patientName": patientDetails.patientName,
            "doctorId": selectedDoctor,
            "appointmentDate": selectedDate.getTime(),
            "timeSlot": selectedTimeSlot,
            "height": 6,
            "weight": 80,
            "Bp": "120/80",
            "status": "booked"
        };
        console.log(body);
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
            timeSlot: selectedTimeSlot,
            department: selectedDepartment
        };
        appointmentCard = (<Card title="Appointment Details" extra={<a onClick={() => { handlePrint(); }}>Print</a>} style={{ width: 300 }}>
            <p>Appointment booked for :</p>
            <p>{patientDetails.patientName}</p>
            <p>on {selectedDate.toDateString()}</p>
            <p>between {selectedTimeSlot}</p>
            <p>At {selectedDepartment}</p>
            <p>With Dr. {map.get(selectedDoctor).doctorName}</p>
        </Card>);
    }

    timeSlots = timeSlot(new Date(), 9, 0, 18, 0, 15).map(val => {
        const timeSlot = moment(val[0].toLocaleTimeString(), "HH:mm:ss").format("hh:mm A") + "-" + moment(val[1].toLocaleTimeString(), "HH:mm:ss").format("hh:mm A");
        return <Option key={timeSlot}>{timeSlot}</Option>;
    });
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
            <PatientDetails patientDetails={patientDetails} />
            <br></br>
            <Divider>Appointment Booking</Divider>
            <Form form={form} name="nest-messages" onFinish={bookAppointment}>
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
                            <Select onChange={handleChangeOfTimeSlot} placeholder="Select Time Slot" style={{ width: 300 }}>
                                {timeSlots}
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
