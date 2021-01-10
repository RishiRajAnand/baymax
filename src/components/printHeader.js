import React from 'react';
import logo from '../assets/images/logo.jpg';
import hospitalDetails from '../utils/constants';
export default class PrintHeader extends React.Component {
    render() {
        return (
            <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <img style={{ width: "400px", margin: "0 auto" }} src={logo} />
                    <div style={{ marginLeft: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                        <p>{hospitalDetails.address}</p>
                        <p>Contact: {hospitalDetails.contact}</p>
                    </div>
                </div>
            </div>
        )
    }
}

