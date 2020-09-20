import { useState } from 'react';
import { getAllMedicines } from '../queries';

const useMedicineSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);

  const request = async () => {
    setIsLoading(true);

    const response = await getAllMedicines();
    if (response) {
        setPatients(response);
    } else {
      // const err = [];
      setPatients([]);
    }
    setIsLoading(false);
  };

  return [patients, isLoading, request];
};

export default useMedicineSearch;