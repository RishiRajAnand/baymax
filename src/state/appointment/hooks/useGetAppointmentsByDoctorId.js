import { useState } from 'react';
import { getAppointmentByDoctorId } from '../queries';

const useGetAppointmentByDoctorId = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);

  const request = async (doctorId) => {
    setIsLoading(true);

    const response = await getAppointmentByDoctorId(doctorId);

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

export default useGetAppointmentByDoctorId;
