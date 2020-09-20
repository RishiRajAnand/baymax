import React, { useEffect } from 'react';
import { Carousel } from 'antd';

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
                <h3 style={contentStyle}>Welcome to Healthcare</h3>
            </div>
            <div>
                <h3 style={contentStyle}>
                    “Wherever the art of Medicine is loved, there is also a love of Humanity. ”</h3>
            </div>
            <div>
                <h3 style={contentStyle}>“As to diseases, make a habit of two things — to help, or at least, to do no harm.”</h3>
            </div>
            <div>
                <h3 style={contentStyle}>“Let food be thy medicine and medicine be thy food.”</h3>
            </div>
        </Carousel>
    );
};

export default HomeScreen;
