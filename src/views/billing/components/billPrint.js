import React, { useRef } from 'react';
import { Descriptions, Divider } from 'antd';
import ReactToPrint from 'react-to-print';
import '../components/billingPrint.css';
import logo from '../../../assets/images/logo.png';
export class BillPrint extends React.Component {
    render() {
        const itemList = this.props.itemList;
        let subtotal = 0;
        const itemArray = itemList.map(item => {
            subtotal = subtotal + item.amount;
            return (
                <tr>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.amount}</td>
                    <td>{item.total}</td>
                </tr>)
        });

        return (
            <>
                {/* <Descriptions title="User Info">
                    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="Remark">empty</Descriptions.Item>
                    <Descriptions.Item label="Address">
                        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                   </Descriptions.Item>
                </Descriptions> */}
                <div id="wrapper" style={{ marginTop: '30px' }}>
                    <img style={{ width: "100px", margin: "0 auto" }} src={logo} />
                    <table border="1" cellpadding="5" cellspacing="5" width="100%">
                        <tr>
                            <th>Name</th>
                            <th>Rishiraj</th>
                            <td>Age</td>
                            <td>27</td>
                        </tr>
                        <tr>
                            <td>PatientId</td>
                            <td>R21212</td>
                            <td>BillId</td>
                            <td>R21212</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>14th Aug 2020</td>
                            <td>Visit type</td>
                            <td>General</td>
                        </tr>
                    </table>
                    <br></br>
                    <table id="customers">
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Total</th>
                        </tr>
                        {itemArray}
                        <tr>
                            <td colspan="2"></td>
                            <td>Subtotal</td>
                            <td>{subtotal}</td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td>Discount</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td>Tax</td>
                            <td>0</td>
                        </tr>
                    </table>
                </div>

            </>

        );
    }
}
