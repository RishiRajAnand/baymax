import { useState } from 'react';
import { savePharmacyMedicine } from '../queries';

const useSavePharmacyMedicine = () => {
  const [status, setStatus] = useState(false);

  const request = async (body) => {
    const response = await savePharmacyMedicine(body);

    if (response === "success") {
      setStatus(true);
    } 
  };

  return [status, request];
};

export default useSavePharmacyMedicine;
