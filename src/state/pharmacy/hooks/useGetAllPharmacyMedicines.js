import { useState } from 'react';
import { getPharmacyMedicineList } from '../queries';
// import { listProducts } from '../actions';

const useGetPharmacyMedicines = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [medicines, setMedicineList] = useState([]);

  const request = async () => {
    setIsLoading(true);

    const response = await getPharmacyMedicineList();
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

export default useGetPharmacyMedicines;