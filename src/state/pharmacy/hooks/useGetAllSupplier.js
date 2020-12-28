import { useState } from 'react';
import { getSuppliersList } from '../queries';

const useGetAllSuppliers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [medicines, setMedicineList] = useState([]);

  const request = async () => {
    setIsLoading(true);

    const response = await getSuppliersList();
    if (response) {
        setMedicineList(response);
    } else {
      // const err = [];
      setMedicineList([]);
    }
    setIsLoading(false);
  };

  return [medicines, isLoading, request];
};

export default useGetAllSuppliers;