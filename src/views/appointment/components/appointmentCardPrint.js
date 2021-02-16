import React, { useRef } from 'react';
import { Descriptions, Divider } from 'antd';
import logo from '../../../assets/images/logo.jpg';
import hospitalDetails from '../../../utils/constants';

export class AppointmentCardPrint extends React.Component {
    render() {
        const appointmentDetails = this.props.appointmentDetails;

        return (
            <>
                <div id="wrapper" style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <img style={{ width: "400px", margin: "0 auto" }} src={logo} />
                        <div style={{ marginLeft: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                            <p>{hospitalDetails.address}</p>
                            <p>Contact: {hospitalDetails.contact}</p>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '2px', background: 'grey', margin: '10px 0px' }}></div>
                    <div style={{ marginTop: '50px' }}>
                        <h3 style={{ fontWeight: 'bold', fontSize: '30px' }}>Appointment Card</h3>
                    </div>
                    <div style={{ marginTop: '50px', width: '100%', padding: '20px' }}>
                        <div style={{ fontSize: '25px', float: 'left' }}>
                            <p><b>Patient Name:</b> {appointmentDetails.patientName}</p>
                            <p><b>Doctor Name:</b> {appointmentDetails.doctorName}</p>
                            <p><b>Date:</b> {appointmentDetails.dateAndTime}</p>
                            <p><b>Time Slot:</b> {appointmentDetails.timeSlot}</p>
                            <p><b>Department: </b>{appointmentDetails.department}</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '50px', width: '100%', padding: '20px' }}>
                        <div style={{ float: 'right' }}>Director Signature</div>

                    </div>
                </div>
            </>
        );
    }
}
