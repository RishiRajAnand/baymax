import { useState } from 'react';
import { getAppointmentByPatientId } from '../queries';

const useGetAppointmentByPatientId = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);

  const request = async (patientId) => {
    setIsLoading(true);

    const response = await getAppointmentByPatientId(patientId);

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

export default useGetAppointmentByPatientId;
