import { useState } from 'react';
import { getPurchaseOrderList } from '../queries';

const UseGetAllPurchaseOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [medicines, setMedicineList] = useState([]);

  const request = async () => {
    setIsLoading(true);

    const response = await getPurchaseOrderList();
    if (response) {
        setMedicineList(response);
    } else {
      setMedicineList([]);
    }
    setIsLoading(false);
  };

  return [medicines, isLoading, request];
};

export default UseGetAllPurchaseOrder;