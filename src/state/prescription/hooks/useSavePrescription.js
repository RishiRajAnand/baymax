import { useState } from 'react';
import { savePrescription } from '../queries';
// import { listProducts } from '../actions';

const useSavePrescription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({});

  const request = async (body) => {
    setIsLoading(true);

    const response = await savePrescription(body);

    setStatus(response);
    setIsLoading(false);
  };

  return [status, isLoading, request];
};

export default useSavePrescription;
