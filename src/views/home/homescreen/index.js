import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import corousal1 from '../../../assets/images/corousal11.jpg';
import corousal2 from '../../../assets/images/corousal22.jpg';
import corousal3 from '../../../assets/images/corousal33.jpg';
import corousal4 from '../../../assets/images/corousal44.jpg';
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
                    Welcome to Baymax Inventories
                </div>
            </div>
            <div>
                <div class="backgroundImageDiv" style={{ backgroundImage: `url(${corousal2})` , color: 'white'}}>
                    Inventories made simple
                </div>
            </div>
            <div>
                <div class="backgroundImageDiv" style={{ backgroundImage: `url(${corousal3})` }}>
                   Keep track of timelines
                </div>
            </div>
            <div>
                <div class="backgroundImageDiv" style={{ backgroundImage: `url(${corousal4})` }}>
                    No more paperwork
                </div>
            </div>
        </Carousel>
    );
};

export default HomeScreen;
