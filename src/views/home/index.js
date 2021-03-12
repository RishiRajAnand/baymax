import { MedicineBoxOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState, useEffect } from 'react';
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
import ViewPrescription from '../prescription/viewPrescription';
import { useStateValue } from '../../state';
import { getRoutes } from '../../routes/routeResolver';
import { ADMIN, DOCTOR, PHARMACY, RECEPTION, UPCOMING } from '../../utils/roles';
import BillSearch from '../billSearch';
import ViewDoctors from '../admin/viewDoctors';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const Home = ({ location, history, match }) => {
  const path = match.path;
  let realRoutes = [];
  const [{ auth }, dispatch] = useStateValue();
  const [collapsed, setCollapsed] = useState(false);
  const [itemSelected, setItemSelected] = useState("");
  const [routes, setRoutes] = useState([]);


  useEffect(() => {
    // setRoutes(getRoutes([RECEPTION, DOCTOR, ADMIN, PHARMACY, UPCOMING]));
    console.log("saaaare roles", auth.roles);
    setRoutes(getRoutes([...auth.roles]));
  }, []);

  const toggle = () => {
    setCollapsed(!collapsed);
    setItemSelected("");
  };

  const handleClick = e => {
    setItemSelected(e.key);
  };

  for (const [roleName, routeList] of Object.entries(routes)) {
    const childroutes = routeList.map(route => {
      return generateRouteObject(route);
    });
    if (auth.roles.length == 1) {
      realRoutes = childroutes;
    } else {
      realRoutes = [...realRoutes, subRoutesByRole(childroutes, roleName)];
    }
    // realRoutes = [...realRoutes, subRoutesByRole(childroutes, roleName)];
  }
  function generateRouteObject(routeObject) {
    return <Menu.Item key={routeObject.label}><Link to={`${path}${routeObject.link}`}>{routeObject.label}</Link></Menu.Item>
  }
  function subRoutesByRole(routes, roleName) {
    return <SubMenu key={roleName} icon={<UserOutlined />} title={roleName}>{routes}</SubMenu>
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu onSelect={handleClick} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {realRoutes}
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
          <Route path={`${path}/billSearch`} component={BillSearch} />
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
          <Route path={`${path}/viewDoctors`} component={ViewDoctors} />
          
        </Content>
        <Footer style={{ textAlign: 'center' }}>BayMax ©2021</Footer>
      </Layout>
    </Layout>
  );

}


export default Home;