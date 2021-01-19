import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import corousal1 from '../../../assets/images/corousal1.jpg';
import corousal2 from '../../../assets/images/corousal2.jpg';
import corousal3 from '../../../assets/images/corousal3.jpg';
import corousal4 from '../../../assets/images/corousal4.jpg';
import '../homescreen/homescreen.css';
const contentStyle = {
    height: '700px',
    color: '#fff',
    lineHeight: '500px',
    textAlign: 'center',
    background: '#364d79',
    fontSize: "32px"
};



const HomeScreen = () => {
    return (
        <Carousel autoplay>
            <div>
                <div class="backgroundImageDiv" style={{ backgroundImage: `url(${corousal1})` }}>
                    Welcome to Baymax Healthcare
                </div>
            </div>
            <div>
                <div class="backgroundImageDiv" style={{ backgroundImage: `url(${corousal2})` }}>
                    Manage everything from central place
                </div>
            </div>
            <div>
                <div class="backgroundImageDiv" style={{ backgroundImage: `url(${corousal3})` }}>
                    Secure and reliable
                </div>
            </div>
            <div>
                <div class="backgroundImageDiv" style={{ backgroundImage: `url(${corousal4})` }}>
                    Access records from anywhere
                </div>
            </div>
        </Carousel>
    );
};

export default HomeScreen;
