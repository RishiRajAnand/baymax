import React from 'react';
import moment from 'moment';
import { Calendar, Select, Row, Col, Button, Card, Divider, Descriptions, Badge } from 'antd';
import '../appointment/appointment.css';

const { Option } = Select;

function onPanelChange(value, mode) {
    console.log(value, mode);
}
function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
}
function handleChange(value) {
    console.log(`selected ${value}`);
}

const Appointment = () => {
    return (
        <>
            <Divider>Patient Details</Divider>
            <Descriptions bordered>
                <Descriptions.Item label="Name">Rishi</Descriptions.Item>
                <Descriptions.Item label="Visit Type">General</Descriptions.Item>
                <Descriptions.Item label="Age">27</Descriptions.Item>
                <Descriptions.Item label="Admission date">2018-04-24 18:00:00</Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                    <Badge status="warning" text="pending" />
                </Descriptions.Item>
            </Descriptions>
            <br></br>
            <Divider>Appointment Booking</Divider>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <div className="site-calendar-demo-card">
                        <Calendar fullscreen={false} onPanelChange={onPanelChange} disabledDate={disabledDate} />
                    </div>
                </Col>
                <Col span={6}>
                    <Select
                        showSearch
                        placeholder="Select Department" style={{ width: 300 }}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        <Option value="jack">All</Option>
                        <Option value="lucy">ENT</Option>
                        <Option value="tom">Ortho</Option>
                        <Option value="tom">Child care</Option>
                        <Option value="tom">General</Option>
                    </Select>
                    <br /><br /><br />
                    <Select
                        showSearch
                        placeholder="Select Doctor" style={{ width: 300 }}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="Yiminghe">Sachin</Option>
                    </Select>
                    <br /><br /><br />
                    <Select placeholder="Select Time Slot" style={{ width: 300 }} onChange={handleChange}>
                        <Option value="jack">11:30 - 11:45</Option>
                        <Option value="jack1">11:30 - 11:45</Option>
                        <Option value="jack2">11:30 - 11:45</Option>
                        <Option value="jack3">11:30 - 11:45</Option>
                        <Option value="jack4">11:30 - 11:45</Option>
                        <Option value="jack5">11:30 - 11:45</Option>
                    </Select>
                </Col>
                <Col span={6}>
                    <Card title="Appointment Details" extra={<a href="#">Print</a>} style={{ width: 300 }}>
                        <p>Appointment booked for :</p>
                        <p>Rishiraj Anand</p>
                        <p>on 14 Aug, 11: 14 AM</p>
                        <p>At ENT Department</p>
                        <p>With Dr. Ramesh</p>
                    </Card>
                </Col>
                <Col span={6}>
                </Col>
            </Row>
            <Row>
                <Col span={12} offset={6}>
                    <Button type="primary" size="large">
                        Book Appointment
                    </Button>
                </Col>
            </Row>
        </>);
};

export default Appointment;
