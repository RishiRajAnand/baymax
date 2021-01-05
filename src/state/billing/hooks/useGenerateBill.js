import { useState } from 'react';
import { saveGenerateBill } from '../queries';

const useSaveGenerateBill = () => {
  const [responseObj, setResponseObj] = useState({});

  const request = async (body) => {
    const response = await saveGenerateBill(body);
    if (response) {
      if (response.response == "success") {
        setResponseObj(response);
      }
    } else {
      setResponseObj(null);
    }
  };

  return [responseObj, request];
};

export default useSaveGenerateBill;
