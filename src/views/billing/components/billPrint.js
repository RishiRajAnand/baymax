import React, { useRef } from 'react';
import '../components/billingPrint.css';
import logo from '../../../assets/images/logo.jpg';
import hospitalDetails from '../../../utils/constants';

export class BillPrint extends React.Component {
    render() {
        const itemList = this.props.itemList;
        const isGSTIncluded = this.props.isGSTIncluded;
        const branddetails = this.props.branddetails;
        const billId = this.props.billId;
        const paymentMode = this.props.paymentMode;
        const patientId = this.props.patientId;
        const patientDetails = this.props.patientDetails;
        const finalCharges = this.props.finalCharges;
        const todaysDate = new Date(this.props.billDate).toDateString();
        const dischargeDate = new Date(this.props.dischargeDate).toDateString();
        const registrationDate = new Date(patientDetails.createdAt).toDateString();
        const itemArray = itemList.map((item, index) => {
            return (
                <tr>
                    <td>{index + 1} .</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.amount}</td>
                    <td style={{ display: (isGSTIncluded ? "table-cell" : "none") }}>{item.gst}</td>
                    <td>{item.discount}</td>
                    <td>{item.total}</td>
                </tr>)
        });

        return (
            <>
                <div id="wrapper" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: "100%" }}>
                        <p style={{ float: 'right', marginLeft: '20px', display: (branddetails.contact ? "block" : "none") }}>
                            Reg No.- {branddetails.regNo}
                        </p>

                    </div>
                    <div>
                        <img style={{ width: "400px", margin: "0 auto" }} src={logo} />
                        {/* <div>
                            <h2 style={{ fontSize: '2em', fontWeight: 'bold' }}>{branddetails.companyName}</h2>
                        </div> */}
                        <div style={{ fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>
                            <p>{branddetails.companyAddress}</p>
                            <p style={{ display: (branddetails.contact ? "block" : "none") }}>Contact: {branddetails.contact}</p>
                            <p style={{ display: (branddetails.website ? "block" : "none") }}>Website: {branddetails.website}</p>
                            <p style={{ display: (branddetails.email ? "block" : "none") }}>Email: {branddetails.email}</p>
                            <p style={{ display: (branddetails.gstin ? "block" : "none") }} >GSTIN: {branddetails.gstin}</p>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '2px', background: 'grey', margin: '10px 0px' }}></div>
                    <table border="1" cellPadding="5" cellSpacing="5" width="100%">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>{patientDetails.patientName}</th>
                                <td>Age</td>
                                <td>{patientDetails.age}</td>
                            </tr>
                            <tr>
                                <td>Patient Id</td>
                                <td>{patientId}</td>
                                <td>Visit type</td>
                                <td>{patientDetails.visitType}</td>
                            </tr>
                            <tr>
                                <td>Bill No.</td>
                                <td>{billId}</td>
                                <td>Bill Date</td>
                                <td>{todaysDate}</td>

                            </tr>
                            <tr>

                                <td style={{ display: (registrationDate ? "table-cell" : "none") }}>Admission  Date</td>
                                <td style={{ display: (registrationDate ? "table-cell" : "none") }}>{registrationDate}</td>
                                <td>Payment mode</td>
                                <td>{paymentMode}</td>
                            </tr>
                            <tr>
                                <td style={{ display: (this.props.isDischargeBill ? "table-cell" : "none") }}>Discharge Date</td>
                                <td style={{ display: (this.props.isDischargeBill ? "table-cell" : "none") }}>{dischargeDate}</td>

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
                                <th>Amount (&#x20B9;)</th>
                                <th style={{ display: (isGSTIncluded ? "table-cell" : "none") }} >GST(CGST + SGST) (&#x20B9;)</th>
                                <th>Discount(%)</th>
                                <th>Total (&#x20B9;)</th>
                            </tr>
                            {itemArray}
                            <tr>
                                <td colSpan={(isGSTIncluded ? "5" : "4")} ></td>
                                <td>Total (&#x20B9;)</td>
                                <td>{finalCharges.totalAmount}</td>
                            </tr>
                            <tr>
                                <td colSpan={(isGSTIncluded ? "5" : "4")}></td>
                                <td>Discount(%)</td>
                                <td>{finalCharges.totalDiscount}</td>
                            </tr>
                            <tr>
                                <td style={{ display: (isGSTIncluded ? "table-cell" : "none") }} colSpan="5"></td>
                                <td style={{ display: (isGSTIncluded ? "table-cell" : "none") }}>Tax (&#x20B9;)</td>
                                <td style={{ display: (isGSTIncluded ? "table-cell" : "none") }}>{finalCharges.totalGST}</td>
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
