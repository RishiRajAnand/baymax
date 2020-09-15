import { useState } from 'react';
import { getAllPatients } from '../queries';
// import { listProducts } from '../actions';

const usePatientSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);

  const request = async () => {
    setIsLoading(true);

    const response = await getAllPatients();
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

export default usePatientSearch;
