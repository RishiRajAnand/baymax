import React, { useRef } from 'react';
import logo from '../../../assets/images/logo.jpg';
import hospitalDetails from '../../../utils/constants';
import './printPrescription.css';
export class PrintPrescription extends React.Component {
    render() {
        const itemList = this.props.itemList;
        const appointmentId = this.props.appointmentId;
        const patientId = this.props.patientId;
        const patientDetails = this.props.patientDetails;
        const patientVitals = this.props.patientVitals;
        const todaysDate = (new Date()).toDateString() + + ' ' + (new Date()).toLocaleTimeString();
        let medicineTable = "";
        let testTable = "";
        if (this.props.medicineList != null && this.props.medicineList.length > 0) {
            const medicineList = this.props.medicineList.map(item => {
                return (
                    <tr>
                        <td>{item.medicineName}</td>
                        <td>{item.dosage}</td>
                        <td>{item.days}</td>
                        <td>{item.comment}</td>
                    </tr>)
            });
            medicineTable = <div style={{ width: '100%' }}>
                <h3 class="heading" >Prescribed medicines</h3>
                <table class="itemTable" >
                    <tr>
                        <th>Medicine Name</th>
                        <th>Dosage</th>
                        <th>Days</th>
                        <th>Comment</th>
                    </tr>
                    {medicineList}
                </table>
            </div>
        }
        if (this.props.testList != null && this.props.testList.length > 0) {
            const testList = this.props.testList.map(item => {
                return (
                    <tr>
                        <td>{item.testName}</td>
                        <td>{item.dateOfBooking}</td>
                        <td>{item.dateOfResult}</td>
                        <td>{item.reportDesc}</td>
                        <td>{item.testDesc}</td>
                    </tr>)
            });
            testTable = <div style={{ width: '100%' }}>
                <h3 class="heading" >Prescribed tests</h3>
                <table class="itemTable">
                    <tr>
                        <th>Test Name</th>
                        <th>Test Date</th>
                        <th>Report Date</th>
                        <th>Doctor comment</th>
                        <th>Report summary</th>
                    </tr>
                    {testList}
                </table>
            </div>

        }

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
                    <h3 class="heading" >Patient Info</h3>
                    <table border="1" cellpadding="5" cellspacing="5" width="100%">
                        <tr>
                            <th>Name</th>
                            <th>{patientDetails.patientName}</th>
                            <td>Age</td>
                            <td>{patientDetails.age}</td>
                        </tr>
                        <tr>
                            <td>PatientId</td>
                            <td>{patientId}</td>
                            <td>AppointmentId</td>
                            <td>{appointmentId}</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>{todaysDate}</td>
                            <td>Visit type</td>
                            <td>{patientDetails.visitType}</td>
                        </tr>
                    </table>
                    <br></br>
                    <div style={{ width: '100%', height: '2px', background: 'grey', margin: '10px 0px' }}></div>
                    <h3 class="heading" >Patient Vitals</h3>
                    <table border="1" cellpadding="5" cellspacing="5" width="100%">
                        <tr>
                            <th>Height : {patientVitals.height}</th>
                            <td>Weight : {patientVitals.weight}</td>
                            <td>Bp : {patientVitals.Bp}</td>
                        </tr>

                        <tr>
                            <td>Temperature : {patientVitals.temperature}</td>
                            <td>Disease description : {patientVitals.diseaseDesc}</td>
                        </tr>
                        <tr>
                            {/* <td>Visit type</td>
                            <td>{patientDetails.visitType}</td> */}
                        </tr>
                    </table>
                    <br></br>
                    <div style={{ width: '100%', height: '2px', background: 'grey', margin: '10px 0px' }}></div>
                    {medicineTable}
                    {testTable}
                    <div style={{ width: '100%', height: '2px', background: 'grey', margin: '10px 0px' }}></div>
                    <table border="1" cellpadding="5" cellspacing="5" width="100%">
                        <tr>
                            <th>Appointment summary : {patientVitals.advise}</th>
                        </tr>
                    </table>
                    <div style={{ marginTop: '50px', width: '100%', padding: '20px' }}>
                        {/* <div>Cashier Signature</div> */}
                        <div style={{ float: 'right' }}>Doctor's Signature</div>

                    </div>
                </div>

            </>

        );
    }
}
