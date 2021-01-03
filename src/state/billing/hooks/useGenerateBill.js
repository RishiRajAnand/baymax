import { useState } from 'react';
import { saveGenerateBill } from '../queries';

const useSaveGenerateBill = () => {
  const [status, setStatus] = useState(false);

  const request = async (body) => {
    const response = await saveGenerateBill(body);

    if (response === "success") {
      setStatus(true);
    } 
  };

  return [status, request];
};

export default useSaveGenerateBill;
