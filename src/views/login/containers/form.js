/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Formik } from 'formik';
// import Button from '../../../components/button';
import FormGroup from '../../../components/form/formGroup';
// import Input from '../../../components/form/input';
import ErrorText from '../../../components/form/error';
import logo from '../../../assets/images/logo.jpg';
import { Form, Input, Button, Checkbox } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: {span: 24 },
};

const LoginForm = (props) => {
  const onFinish = (values) => {
    console.log('Success:', values);
    props.onSubmit(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {/* <img style={{ width: "300px", marginBottom: '20px' }} src={logo} /> */}
      <h1 style={{ width: "300px", height: '50px', marginBottom: '20px' , textAlign: 'center', backgroundColor: '#001529', color: "white", fontSize: '32px'}}>Baymax Inventory</h1>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          placeholder="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          placeholder="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" style={{ width: '100%'}}  htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    </>
  );
};

// const LoginForm = props => (

//   return (<>
//   <img style={{ width: "300px", marginBottom: '20px' }} src={logo} />
//   <Form
//     {...layout}
//     name="basic"
//     initialValues={{ remember: true }}
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//   >
//     <Form.Item
//       label="Username"
//       name="username"
//       rules={[{ required: true, message: 'Please input your username!' }]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item
//       label="Password"
//       name="password"
//       rules={[{ required: true, message: 'Please input your password!' }]}
//     >
//       <Input.Password />
//     </Form.Item>

//     <Form.Item {...tailLayout} name="remember" valuePropName="checked">
//       <Checkbox>Remember me</Checkbox>
//     </Form.Item>

//     <Form.Item {...tailLayout}>
//       <Button type="primary" htmlType="submit">
//         Submit
//         </Button>
//     </Form.Item>
//   </Form>
//   <Formik initialValues={{ username: '', password: '' }} {...props}>
//     {({ handleChange, handleBlur, values, handleSubmit, errors }) => (
//       <FormGroup>
//         {errors.genericError && <ErrorText>{errors.genericError}</ErrorText>}
//         <Input
//           name="username"
//           id="username"
//           placeholder="Username"
//           onChange={handleChange('username')}
//           onBlur={handleBlur('username')}
//           error={errors.username}
//           value={values.username}
//         />
//         <Input
//           id="password"
//           name="password"
//           type="password"
//           placeholder="Password"
//           onChange={handleChange('password')}
//           onBlur={handleBlur('password')}
//           error={errors.password}
//           value={values.password}
//         />
//         <Button primary large onClick={handleSubmit} style={{ background: 'skyblue', color: 'white' }} type="submit">
//           Login
//         </Button>
//       </FormGroup>
//     )}
//   </Formik>
// </>);

// );

export default LoginForm;
