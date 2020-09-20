import { useState } from 'react';
import { addMedicine, addTest } from '../queries';

const useAddTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const request = async (body) => {
    setIsLoading(true);

    const response = await addTest(body);

    if (response) {
      if (response.status === "SUCCESS") {
        setStatus(true);
      }
      // dispatch(listProducts(response));
    } else {
      // const err = [];
      setStatus(false);
      // dispatch(listProducts(err));
    }
    setIsLoading(false);
  };

  return [status, isLoading, request];
};

export default useAddTest;
