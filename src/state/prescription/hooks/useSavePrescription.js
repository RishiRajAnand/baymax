import { useState } from 'react';
import { savePrescription } from '../queries';
// import { listProducts } from '../actions';

const useSavePrescription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const request = async (body) => {
    setIsLoading(true);

    const response = await savePrescription(body);

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

export default useSavePrescription;
