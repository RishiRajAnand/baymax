import { useState } from 'react';
import { savePurchaseOrder } from '../queries';

const useSavePurchaseOrder = () => {
  const [status, setStatus] = useState(false);

  const request = async (body) => {
    const response = await savePurchaseOrder(body);

    if (response) {
      if (response.status === "SUCCESS") {
        setStatus(true);
      }
    } else {
      setStatus(false);
    }
  };

  return [status, request];
};

export default useSavePurchaseOrder;
