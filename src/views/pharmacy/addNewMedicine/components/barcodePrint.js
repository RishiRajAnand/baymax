import React, { useRef } from 'react';
import { Descriptions, Divider } from 'antd';

export class BarcodePrint extends React.Component {
    render() {
        var image = { src: '' };
        const barcodeDetails = this.props.barcodeDetails;
        image.src = 'data:image/jpeg;base64,' + barcodeDetails.barcode;

        return (
            <>
                <div id="wrapper" style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ marginTop: '10px', width: '100%', padding: '20px', textAlign: 'center' }}>
                        <img src={image.src} style={{ width: '100%' }} />
                        {/* <p>{barcodeDetails.barcode}</p> */}
                        {/* <p>{barcodeDetails.barcodeNum}</p> */}
                        {/* <p style={{ fontSize: '20px' }}>{barcodeDetails.productName}</p>
                        <p style={{ fontSize: '20px' }}>&#x20B9; {barcodeDetails.productPrice}</p> */}
                    </div>
                </div>
            </>
        );
    }
}
