import { MedicineBoxOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
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
import PurchaseOrder from '../pharmacy/purchaseOrderList';
import NewPurchaseOrder from '../pharmacy/newPurchaseOrder';
import IndentPreparation from '../pharmacy/indentPreparations';
import ManageSupplier from '../pharmacy/manageSupplier';
import IndentList from '../pharmacy/indentPreparations/indentList';
import Certificates from '../certificates';
import Package from '../package';
import NewPackage from '../package/newPackage';
import InProgress from '../inProgress';
import viewPrescription from '../prescription/viewPrescription';
import ViewPrescription from '../prescription/viewPrescription';
import { useStateValue } from '../../state';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const Home = ({ location, history, match }) => {
  const path = match.path;
  const [{ auth }, dispatch] = useStateValue();
  const [collapsed, setCollapsed] = useState(false);
  const [itemSelected, setItemSelected] = useState("");

  const toggle = () => {
    setCollapsed(!collapsed);
    setItemSelected("");
  };

  const handleClick = e => {
    setItemSelected(e.key);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu onSelect={handleClick} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <SubMenu key="Patient" icon={<UserOutlined />} title="Patient">
            <Menu.Item key="Patient Registration"><Link to={`${path}/registration`}>Registration</Link></Menu.Item>
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
            <Menu.Item key="Service Catalogue"><Link to={`${path}/inProgress`}>Service Catalogue</Link></Menu.Item>
            {/* <Menu.Item key="Add Departments">Add Departments</Menu.Item>
              <Menu.Item key="Add Employees">Add Employees</Menu.Item>
              <Menu.Item key="Add Services">Add Services</Menu.Item> */}
          </SubMenu>
          <SubMenu key="Pharmacy Management" icon={<MedicineBoxOutlined />} title="Pharmacy">
            {/* <Menu.Item key="Indent Preparation"><Link to={`${path}/indentPreparation`}>Indent Preparation</Link></Menu.Item> */}
            {/* <Menu.Item key="Indent List"><Link to={`${path}/indentList`}>Indent List</Link></Menu.Item> */}
            <Menu.Item key="Add New Medicine"><Link to={`${path}/addNewMedicine`}>New Medicine</Link></Menu.Item>
            <Menu.Item key="Purchase Order List"><Link to={`${path}/purchaseOrderList`}>Purchase List</Link></Menu.Item>
            <Menu.Item key="New Purchase Order"><Link to={`${path}/newPurchaseOrder`}>New Purchase Order</Link></Menu.Item>
            <Menu.Item key="Manage Medicines"><Link to={`${path}/manageMedicines`}>Manage Medicine</Link></Menu.Item>
            <Menu.Item key="Manage Suppliers"><Link to={`${path}/manageSuppliers`}>Manage Suppliers</Link></Menu.Item>
          </SubMenu>
          <Menu.Item key="Billing" icon={<UploadOutlined />}>
            <Link to={`${path}/billing`}>Billing</Link>
          </Menu.Item>
          <Menu.Item key="Appointment" icon={<UploadOutlined />}>
            <Link to={`${path}/appointment`}>Appointment</Link>
          </Menu.Item>
          {/* <Menu.Item key="Prescription" icon={<UploadOutlined />}>
            <Link to={`${path}/prescription`}>Prescription</Link>
          </Menu.Item> */}
          <SubMenu key="Upcoming Features" icon={<UserOutlined />} title="Upcoming">
            <Menu.Item key="Certificates" icon={<UploadOutlined />}>
              <Link to={`${path}/certificates`}>Certificates</Link>
            </Menu.Item>
            <Menu.Item key="Package Management" icon={<UploadOutlined />}>
              <Link to={`${path}/package`}>Packages</Link>
            </Menu.Item>
            <Menu.Item key="Canteen" icon={<UploadOutlined />}>
              <Link to={`${path}/canteen`}>Canteen</Link>
            </Menu.Item>
            <Menu.Item key="Pharmacy" icon={<VideoCameraOutlined />}>
              <Link to={`${path}/pharmacy`}>Pharmacy</Link>
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
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
          {itemSelected}
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
          <Route path={`${path}/purchaseOrderList`} component={PurchaseOrder} />
          <Route path={`${path}/newPurchaseOrder`} component={NewPurchaseOrder} />
          <Route path={`${path}/indentPreparation`} component={IndentPreparation} />
          <Route path={`${path}/indentList`} component={IndentList} />
          <Route path={`${path}/certificates`} component={Certificates} />
          <Route path={`${path}/package`} component={Package} />
          <Route path={`${path}/newPackage`} component={NewPackage} />
          <Route path={`${path}/manageSuppliers`} component={ManageSupplier} />
          <Route path={`${path}/inProgress`} component={InProgress} />
          <Route path={`${path}/viewPrescription`} component={ViewPrescription} />

        </Content>
        <Footer style={{ textAlign: 'center' }}>BayMax ©2021</Footer>
      </Layout>
    </Layout>
  );

}


export default Home;