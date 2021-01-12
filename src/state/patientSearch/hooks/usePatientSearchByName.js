import { useState } from 'react';
import { getPatientByName } from '../queries';

const usePatientByName = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);

  const request = async (patientName) => {
    setIsLoading(true);

    const response = await getPatientByName(patientName);
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

export default usePatientByName;
