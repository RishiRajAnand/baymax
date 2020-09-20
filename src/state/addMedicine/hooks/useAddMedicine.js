import { useState } from 'react';
import { addMedicine } from '../queries';

const useAddMedicine = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const request = async (body) => {
    setIsLoading(true);

    const response = await addMedicine(body);

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

export default useAddMedicine;
