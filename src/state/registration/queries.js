import axios from 'axios';
import api from '../../utils/services';

export const registration = (body) => {
  return axios
    .post(`${api.url}/patient/registration`, body)
    .then(res => res.data)
    .catch(err => {
      return err;
    }); 
};

export const doctorsRegistration = (body) => {
  return axios
    .post(`${api.url}/doctorService/createNewDoctorsRecord`, body)
    .then(res => res.data)
    .catch(err => {
      return err;
    }); 
};
