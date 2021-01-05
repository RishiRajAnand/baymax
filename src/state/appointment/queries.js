import axios from 'axios';
import api from '../../utils/services';

export const bookAppointment = (body) => {
  return axios
    .post(`${api.url}/HMServiceController/createNewAppointment`, body)
    .then(res => res.data)
    .catch(err => {
      return err;
    });
};

export const getAppointmentByDoctorId = (doctorId) => {
  return axios
    .get(`${api.url}/HMServiceController/getAppointmentList?numberOfDays=30&startIndex=0&pazeSize=30&doctorId=` + doctorId)
    .then(res => res.data)
    .catch(err => {
      return err.response;
    });
};

export const getAppointmentByPatientId = (patientId) => {
  return axios
    .get(`${api.url}/HMServiceController/getAppointmentListByPatientId?numberOfDays=30&startIndex=0&pazeSize=30patientId=` + patientId)
    .then(res => res.data)
    .catch(err => {
      return err.response;
    });
};