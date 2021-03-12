import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, Route } from "react-router-dom";
import { useStateValue } from '../state';
import { logout } from '../state/auth/actions';
import { PageHeader, Menu, Dropdown, Button, Tag, Typography, Row, Modal } from 'antd';
import { SettingFilled } from '@ant-design/icons';
import AppSettings from '../views/appSettings';
// import Button from './button';

const Nav = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: #001529;
  position: ${props => (props.fixed ? 'fixed' : 'relative')};
`;

const Right = styled.nav`
  flex: 1;
  text-align: right;
`;

const Title = styled.h1`
  margin: 0;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Header = props => {
  const [{ auth }, dispatch] = useStateValue();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={() => setIsModalVisible(true)}>
          Settings
        </a>
      </Menu.Item>
      <Menu.Item>
        <a>
          About Us
        </a>
      </Menu.Item>
      <Menu.Item>
        <a>
          Help
        </a>
      </Menu.Item>
      <Menu.Item>
        <Link to={`/`}>
          <a onClick={() => handleLogout()}>
            Log Out
        </a>
        </Link>

      </Menu.Item>
    </Menu>
  );
  const DropdownMenu = () => (
    <Dropdown key="more" overlay={menu}>
      <Button
        style={{
          border: 'none',
          padding: 0,
          width: '5em'
        }}
      >
        <SettingFilled
          style={{
            fontSize: 20,
            verticalAlign: 'top',
          }}
        />
      </Button>
    </Dropdown>
  );
  const handleLogout = async () => {
    await dispatch(logout());
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  return (
    <Nav>
      <Title><Link to={`/home`}>BAYMAX</Link></Title>
      <Right>
        <DropdownMenu key="more" />
        {/* <Link to={`/`} dis><Button gradient onClick={() => handleLogout()}>
          Logout
          </Button>
        </Link> */}
      </Right>
      <Modal  width={1000} title="My Settings" visible={isModalVisible} footer={null} onOk={() => { setIsModalVisible(false) }} onCancel={() => { setIsModalVisible(false) }}>
        <AppSettings />
      </Modal>
    </Nav>
  );
};

export default Header;
