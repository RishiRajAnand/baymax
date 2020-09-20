import { useState } from 'react';
import { getAllDoctorsByDepartment } from '../queries';
// import { listProducts } from '../actions';

const useGetAllDoctorByDepartment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState([]);

  const request = async (deptname) => {
    setIsLoading(true);

    const response = await getAllDoctorsByDepartment(deptname);
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

export default useGetAllDoctorByDepartment;
