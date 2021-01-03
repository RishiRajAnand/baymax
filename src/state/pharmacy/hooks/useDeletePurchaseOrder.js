import { useState } from 'react';
import { deletePurchaseOrder } from '../queries';

const useDeletePurchaseOrder = () => {
  const [status, setStatus] = useState(false);

  const request = async (body) => {
    const response = await deletePurchaseOrder(body);

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

export default useDeletePurchaseOrder;
