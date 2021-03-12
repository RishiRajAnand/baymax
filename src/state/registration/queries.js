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

export const saveBrandDetails = (body) => {
  return axios
    .post(`${api.url}/SettingsController/updateBrandDetails`, body)
    .then(res => res.data)
    .catch(err => {
      return err;
    }); 
};

export const getBrandDetails = (body) => {
  return axios
    .get(`${api.url}/SettingsController/getBrandDetails`)
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

export const getDoctorDetailById = (doctorId) => {
  return axios
    .get(`${api.url}/doctorService/getDoctorDetailById?doctorId=` +  doctorId)
    .then(res => res.data)
    .catch(err => {
      return err;
    }); 
};
