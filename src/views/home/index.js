import { MedicineBoxOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Link, Route } from "react-router-dom";
import AddDoctor from '../admin/addDoctor';
import Appointment from '../appointment';
import Billing from '../billing';
import Canteen from '../canteen';
import CanteenStock from '../canteen/canteenStock';
import DoctorAppointment from '../doctorAppointment';
import '../home/home.css';
import AddMedicine from '../medicine/addMedicine';
import AddTest from '../medicine/addTest';
import PackageManagement from '../package';
import PatientSearch from '../patientSearch';
import Pharmacy from '../pharmacy';
import Prescription from '../prescription';
import Registration from '../registration';
import HomeScreen from './homescreen';
import AddNewMedicine from '../pharmacy/addNewMedicine';
import ManageMedicines from '../pharmacy/manageMedicine';


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
              <Menu.Item key="Add Medicines"><Link to={`${path}/addMedicine`}>Add Medicines</Link></Menu.Item>
              <Menu.Item key="Add Test"><Link to={`${path}/addTest`}>Add Tests</Link></Menu.Item>
              <Menu.Item key="Add Departments">Add Departments</Menu.Item>
              <Menu.Item key="Add Employees">Add Employees</Menu.Item>
              <Menu.Item key="Add Services">Add Services</Menu.Item>
            </SubMenu>
            <SubMenu key="Pharmacy Management" icon={<MedicineBoxOutlined />} title="Pharmacy">
              <Menu.Item key="Add New Medicine"><Link to={`${path}/addNewMedicine`}>New Medicine</Link></Menu.Item>
              <Menu.Item key="Manage Medicines"><Link to={`${path}/manageMedicines`}>Manage Medicine</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="Billing" icon={<UploadOutlined />}>
              <Link to={`${path}/billing`}>Billing</Link>
            </Menu.Item>
            <Menu.Item key="Appointment" icon={<UploadOutlined />}>
              <Link to={`${path}/appointment`}>Appointment</Link>
            </Menu.Item>
            <Menu.Item key="Prescription" icon={<UploadOutlined />}>
              <Link to={`${path}/prescription`}>Prescription</Link>
            </Menu.Item>
            <SubMenu key="Upcoming Features" icon={<UserOutlined />} title="Upcoming">
              <Menu.Item key="Canteen" icon={<UploadOutlined />}>
                <Link to={`${path}/canteen`}>Canteen</Link>
              </Menu.Item>
              <Menu.Item key="Pharmacy" icon={<VideoCameraOutlined />}>
                <Link to={`${path}/pharmacy`}>Pharmacy</Link>
              </Menu.Item>
              <Menu.Item key="Package Management" icon={<UploadOutlined />}>
                <Link to={`${path}/packages`}>Packages</Link>
              </Menu.Item>
              <Menu.Item key="Reimbursements" icon={<UploadOutlined />}>
                Reimbursements
            </Menu.Item>
              <Menu.Item key="Insurance" icon={<UploadOutlined />}>
                Insurance
            </Menu.Item>
              <Menu.Item key="Certificate creation" icon={<UploadOutlined />}>
                Certificate creation
            </Menu.Item>
              <Menu.Item key="Referrals" icon={<UploadOutlined />}>
                Referrals
            </Menu.Item>
            </SubMenu>
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
              overflow: 'auto',
              height: '100vh',
            }}
          >
            <Route exact path="/home" component={HomeScreen} />
            <Route path={`${path}/billing`} component={Billing} />
            <Route path={`${path}/registration`} component={Registration} />
            <Route path={`${path}/patientSearch`} component={PatientSearch} />
            <Route path={`${path}/addDoctor`} component={AddDoctor} />
            <Route path={`${path}/appointment`} component={Appointment} />
            <Route path={`${path}/doctorAppointment`} component={DoctorAppointment} />
            <Route path={`${path}/prescription`} component={Prescription} />
            <Route path={`${path}/addMedicine`} component={AddMedicine} />
            <Route path={`${path}/addTest`} component={AddTest} />
            <Route path={`${path}/packages`} component={PackageManagement} />
            <Route path={`${path}/canteen`} component={Canteen} />
            <Route path={`${path}/canteenStock`} component={CanteenStock} />
            <Route path={`${path}/pharmacy`} component={Pharmacy} />
            <Route path={`${path}/addNewMedicine`} component={AddNewMedicine} />
            <Route path={`${path}/manageMedicines`} component={ManageMedicines} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>BayMax ©2020 Created by Rishiraj</Footer>
        </Layout>
      </Layout>
    );
  }
}


export default Home;