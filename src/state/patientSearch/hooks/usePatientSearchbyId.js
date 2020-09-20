import { useState } from 'react';
import { getPatientById } from '../queries';

const usePatientById = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState({});

  const request = async (patientId) => {
    setIsLoading(true);

    const response = await getPatientById(patientId);
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

export default usePatientById;
