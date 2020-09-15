import React from 'react';
import { Layout, Menu } from 'antd';
import { Route, Link } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import '../home/home.css';
import Billing from '../billing';
import Registration from '../registration';
import PatientSearch from '../patientSearch';
import AddDoctor from '../admin/addDoctor';
import Appointment from '../appointment';
import DoctorAppointment from '../doctorAppointment';
import Prescription from '../prescription';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

class Home extends React.Component {

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      itemSelected: ""
    });
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ itemSelected: e.key })
  };

  render() {
    const path = this.props.match.path;
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu onSelect={this.handleClick} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <SubMenu key="1" icon={<UserOutlined />} title="Patient">
              <Menu.Item key="Registration"><Link to={`${path}/registration`}>Registration</Link></Menu.Item>
              <Menu.Item key="Search Patients"><Link to={`${path}/patientSearch`}>Search Patients</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="doctor" icon={<UserOutlined />} title="Doctor">
              <Menu.Item key="Doctor Appointment"><Link to={`${path}/doctorAppointment`}>Appointments</Link></Menu.Item>
              {/* <Menu.Item key="Search Patients"><Link to={`${path}/patientSearch`}>Search Patients</Link></Menu.Item> */}
            </SubMenu>
            <SubMenu key="Admin" icon={<UserOutlined />} title="Admin">
              <Menu.Item key="Add Doctors"><Link to={`${path}/addDoctor`}>Add Doctors</Link></Menu.Item>
              <Menu.Item key="Add Departments">Add Departments</Menu.Item>
              <Menu.Item key="Add Medicines">Add Medicines</Menu.Item>
              <Menu.Item key="Add Employees">Add Employees</Menu.Item>
              <Menu.Item key="Add Services">Add Services</Menu.Item>
            </SubMenu>
            <Menu.Item key="Pharmacy" icon={<VideoCameraOutlined />}>
              Pharmacy
            </Menu.Item>
            <Menu.Item key="Canteen" icon={<UploadOutlined />}>
              Canteen
            </Menu.Item>
            <Menu.Item key="Billing" icon={<UploadOutlined />}>
              <Link to={`${path}/billing`}>Billing</Link>
            </Menu.Item>
            <Menu.Item key="Appointment" icon={<UploadOutlined />}>
              <Link to={`${path}/appointment`}>Appointment</Link>
            </Menu.Item>
            <Menu.Item key="Prescription" icon={<UploadOutlined />}>
              <Link to={`${path}/prescription`}>Prescription</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
            {this.state.itemSelected}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Route path={`${path}/billing`} component={Billing} />
            <Route path={`${path}/registration`} component={Registration} />
            <Route path={`${path}/patientSearch`} component={PatientSearch} />
            <Route path={`${path}/addDoctor`} component={AddDoctor} />
            <Route path={`${path}/appointment`} component={Appointment} />
            <Route path={`${path}/doctorAppointment`} component={DoctorAppointment} />
            <Route path={`${path}/prescription`} component={Prescription} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>BayMax ©2018 Created by Rishiraj</Footer>
        </Layout>
      </Layout>
    );
  }
}


export default Home;