import axios from 'axios';
import api from '../../utils/services';

export const getAllPatients = () => {
  return axios
    .get(`${api.url}/patient/patientsList`)
    .then(res => res.data)
    .catch(err => {
      return err.response;
    });
};

export const getPatientById = (patientId) => {
  return axios
    .get(`${api.url}/patient/patientById?patientId=` + patientId)
    .then(res => res.data)
    .catch(err => {
      return err.response;
    });
};


export const getAllDoctors = () => {
  return axios
    .get(`${api.url}/doctorService/getDoctorsList`)
    .then(res => res.data)
    .catch(err => {
      return err.response;
    });
};

export const getAllDoctorsByDepartment = (name) => {
  return axios
    .get(`${api.url}/doctorService/getDoctorsListByDepartment?departmentName=` + name)
    .then(res => res.data)
    .catch(err => {
      return err.response;
    });
};

