import { useState } from 'react';
import { registration } from '../queries';
// import { listProducts } from '../actions';

const useRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseObj, setResponseObj] = useState({});

  const request = async (body) => {
    setIsLoading(true);

    const response = await registration(body);

    if (response) {
      if (response.recieptId !== null) {
        setResponseObj(response);
      }
      // dispatch(listProducts(response));
    } else {
      // const err = [];
      setResponseObj(null);
      // dispatch(listProducts(err));
    }
    setIsLoading(false);
  };

  return [responseObj, isLoading, request];
};

export default useRegistration;
