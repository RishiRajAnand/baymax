import React, { useRef } from 'react';
import '../components/billingPrint.css';
import logo from '../../../assets/images/logo.jpg';
import hospitalDetails from '../../../utils/constants';

export class BillPrint extends React.Component {
    render() {
        const itemList = this.props.itemList;
        const billId = this.props.billId;
        const paymentMode = this.props.paymentMode;
        const patientId = this.props.patientId;
        const patientDetails = this.props.patientDetails;
        const finalCharges = this.props.finalCharges;

        const todaysDate =  new Date(this.props.billDate).toDateString();
        const itemArray = itemList.map(item, index=> {
            return (
                <tr>
                    <td>{index + 1} .</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.amount}</td>
                    <td>{item.gst}</td>
                    <td>{item.discount}</td>
                    <td>{item.total}</td>
                </tr>)
        });

        return (
            <>
                <div id="wrapper" style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        {/* <img style={{ width: "400px", margin: "0 auto" }} src={logo} /> */}
                        <div>
                            <h2 style={{ fontSize: '2em', fontWeight: 'bold' }}>{hospitalDetails.name}</h2>
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
                            <p>{hospitalDetails.address}</p>
                            <p>Contact: {hospitalDetails.contact}</p>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '2px', background: 'grey', margin: '10px 0px' }}></div>
                    <table border="1" cellPadding="5" cellSpacing="5" width="100%">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>{patientDetails.patientName}</th>
                                <td>BillId</td>
                                <td>{billId}</td>
                            </tr>
                            {/* <tr>
                                <td>PatientId</td>
                                <td>{patientId}</td>
                                <td>BillId</td>
                                <td>{billId}</td>
                            </tr> */}
                            <tr>
                                <td>Date</td>
                                <td>{todaysDate}</td>
                                <td>Payment mode</td>
                                <td>{paymentMode}</td>
                            </tr>
                        </tbody>

                    </table>
                    <br></br>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>S.No</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>GST(CGST + SGST)</th>
                                <th>Discount(%)</th>
                                <th>Total</th>
                            </tr>
                            {itemArray}
                            <tr>
                                <td colSpan="4"></td>
                                <td>Total</td>
                                <td>{finalCharges.totalAmount}</td>
                            </tr>
                            <tr>
                                <td colSpan="4"></td>
                                <td>Discount(%)</td>
                                <td>{finalCharges.totalDiscount}</td>
                            </tr>
                            <tr>
                                <td colSpan="4"></td>
                                <td>Tax</td>
                                <td>{finalCharges.totalGST}</td>
                            </tr>
                        </tbody>

                    </table>
                    <div style={{ marginTop: '50px', width: '100%', padding: '20px' }}>
                        <div>Cashier Signature</div>
                        <div style={{ float: 'right' }}>Director Signature</div>

                    </div>
                </div>

            </>

        );
    }
}
