import React, { useEffect } from 'react';

import useLogin from '../../state/auth/hooks/useLogin';

import Container from './containers/container';
import Form from './containers/form';
import Spinner from '../../components/spinner';
import { notification } from 'antd';
import { ADMIN, DOCTOR, INVENTORY, PHARMACY, RECEPTION, UPCOMING } from '../../utils/roles';

const allowedRoles = [DOCTOR, PHARMACY, RECEPTION, UPCOMING, ADMIN, INVENTORY]
const Login = ({ location, history }) => {
  const { from } = location.state || { from: { pathname: '/home' } };
  const [auth, setLogin, isLoading] = useLogin();

  useEffect(() => {
    if (auth.logged) {
      history.push(from);
    }
  }, [auth, from, history]);

  function checkAllowedUsers(values) {
    for (const roleName of allowedRoles) {
      if (roleName == values.username && roleName == values.password) {
        return true;
      }
    }
    return false;
  }
  return (
    <Container>
      <Spinner show={isLoading} />
      <Form onSubmit={(values, actions) => {
        console.log("values", values);
        console.log("actions", actions);
        if (checkAllowedUsers(values)) {
          setLogin({ values, actions });
        } else {
          notification["error"]({
            message: 'Invalid username or password!',
            description:
              'Please check the username and password and try again.',
            duration: 5,
          });
        }

      }} />
    </Container>
  );
};

export default Login;
