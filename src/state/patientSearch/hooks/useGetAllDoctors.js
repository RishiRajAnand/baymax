import { useState } from 'react';
import { getAllDoctors } from '../queries';
// import { listProducts } from '../actions';

const useGetAllDoctors = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);

  const request = async () => {
    setIsLoading(true);

    const response = await getAllDoctors();
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

export default useGetAllDoctors;
