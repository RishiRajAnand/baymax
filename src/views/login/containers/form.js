/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Formik } from 'formik';
import Button from '../../../components/button';
import FormGroup from '../../../components/form/formGroup';
import Input from '../../../components/form/input';
import ErrorText from '../../../components/form/error';
import logo from '../../../assets/images/logo.png';

const LoginForm = props => (
  <>
    <img style={{ width: "300px", margin: "0 auto" }} src={logo} />
    <Formik initialValues={{ username: '', password: '' }} {...props}>
      {({ handleChange, handleBlur, values, handleSubmit, errors }) => (
        <FormGroup>
          {errors.genericError && <ErrorText>{errors.genericError}</ErrorText>}
          <Input
            name="username"
            id="username"
            placeholder="Username"
            onChange={handleChange('username')}
            onBlur={handleBlur('username')}
            error={errors.username}
            value={values.username}
          />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            value={values.password}
          />
          <Button primary large onClick={handleSubmit} type="submit">
            Login
        </Button>
        </FormGroup>
      )}
    </Formik>
  </>
);

export default LoginForm;
