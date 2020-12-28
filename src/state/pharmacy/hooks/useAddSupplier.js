import { useState } from 'react';
import { saveSupplier } from '../queries';

const useAddSupplier = () => {
  const [status, setStatus] = useState(false);

  const request = async (body) => {
    const response = await saveSupplier(body);

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
  };

  return [status, request];
};

export default useAddSupplier;
