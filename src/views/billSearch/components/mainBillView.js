import React, { useRef } from 'react';
import '../components/mainBillView.css';
import logo from '../../../assets/images/logo.jpg';
import hospitalDetails from '../../../utils/constants';

export class MainBillView extends React.Component {
    render() {
        const billItemList = this.props.billItemList;
        const patientId = this.props.patientId;
        const patientDetails = this.props.patientDetails;
        const todaysDate = (new Date()).toDateString() + + ' ' + (new Date()).toLocaleTimeString();
        const itemArray = billItemList.map(item => {
            let itemList = [];
            if (item['billDetailList']) {
                itemList = item['billDetailList'].map(billItem => {
                    return (
                        <tr>
                            <td>{(billItem.purchaseType == "pharmacy-return" ? billItem.itemName + '(' + billItem.purchaseType + ')' : billItem.itemName)}</td>
                            <td>{billItem.quantity}</td>
                            <td>{billItem.mrp}</td>
                            <td>{billItem.gstPercentage}</td>
                            <td>{billItem.concessionPercentage}</td>
                            <td>{billItem.cost}</td>
                        </tr>
                    );
                });
            }
            return (
                <div style={{ width: '100%' }}>
                    <div class="billDetail" style={{ marginLeft: '10px' }}>
                        <span>Bill Id:</span> {item.billId} &nbsp;&nbsp;
                    <span>Bill Date:</span> {new Date(item.createdAt).toDateString()} &nbsp;&nbsp;
                    <span>Payment Mode:</span> {item.paymentMode}
                    </div>
                    <br />
                    <table class="itemTable" width="100%">
                        <tbody>
                            <tr>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>GST(%)</th>
                                <th>Discount(%)</th>
                                <th>Total</th>
                            </tr>
                            {itemList}
                        </tbody>
                    </table>
                    <br />
                    <div class="billDetail" style={{ marginLeft: '10px' }}>
                        <span>Total Amount :</span> {item.totalCost} &nbsp;&nbsp;
                        <span>Total Discount :</span>  {item.totalDiscount} &nbsp;&nbsp;
                        <span>Total GST :</span>  {item.totalGST}
                    </div>
                    <hr />
                </div>
            )
        });

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
                    <table border="1" cellpadding="5" cellspacing="5" width="100%">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>{patientDetails.patientName}</th>
                                <td>Age</td>
                                <td>{patientDetails.age}</td>
                            </tr>
                            <tr>
                                <td>PatientId</td>
                                <td>{patientId}</td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td>{todaysDate}</td>
                                <td>Visit type</td>
                                <td>{patientDetails.visitType}</td>
                            </tr>
                        </tbody>

                    </table>
                    <br></br>
                    {itemArray}
                    <div style={{ marginTop: '50px', width: '100%', padding: '20px' }}>
                        <div>Cashier Signature</div>
                        <div style={{ float: 'right' }}>Director Signature</div>
                    </div>
                </div>

            </>

        );
    }
}
