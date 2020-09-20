import { useState } from 'react';
import { getAllMedicines, getAllTests } from '../queries';

const useTestSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);

  const request = async () => {
    setIsLoading(true);

    const response = await getAllTests();
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

export default useTestSearch;