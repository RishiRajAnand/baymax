import React, { useState, useEffect } from 'react';
import { Menu, Row, Col } from 'antd';
import BrandSettings from './brandSettings';
const AppSettings = (props) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState("brand");
    let form = "";

    const handleClick = e => {
        setSelectedMenuItem(e.key);
    };

    if (selectedMenuItem == "brand") {
        form = <BrandSettings />;
    }
    return (
        <div>
            <Row gutter={16}>
                <Col span={4}>
                    <Menu style={{ width: '100%' }} onClick={handleClick} selectedKeys={[selectedMenuItem]} mode="inline">
                        <Menu.Item key="brand">Brand</Menu.Item>
                        {/* <Menu.Item key="profile">Profile</Menu.Item> */}
                    </Menu>
                </Col>
                <Col span={18}>{form}</Col>
            </Row>


        </div>
    );
};
export default AppSettings;