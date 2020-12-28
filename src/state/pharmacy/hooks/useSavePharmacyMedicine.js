import { useState } from 'react';
import { savePharmacyMedicine } from '../queries';

const useSavePharmacyMedicine = () => {
  const [status, setStatus] = useState(false);

  const request = async (body) => {
    const response = await savePharmacyMedicine(body);

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

export default useSavePharmacyMedicine;
