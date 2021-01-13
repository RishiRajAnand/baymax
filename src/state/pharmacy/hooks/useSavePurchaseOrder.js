import { useState } from 'react';
import { savePurchaseOrder } from '../queries';

const useSavePurchaseOrder = () => {
  const [status, setStatus] = useState("");

  const request = async (body) => {
    const response = await savePurchaseOrder(body);

    setStatus(response);
  };

  return [status, request];
};

export default useSavePurchaseOrder;
