import axios from 'axios';
import api from '../../utils/services';

export const addMedicine = (body) => {
  return axios
    .post(`${api.url}/medicine/medicine`, body)
    .then(res => res.data)
    .catch(err => {
      return err;
    }); 
};

export const getAllMedicines = () => {
  return axios
    .get(`${api.url}/medicine/medicineList`)
    .then(res => res.data)
    .catch(err => {
      return err;
    });
};

export const getAllTests = () => {
  return axios
    .get(`${api.url}/test/testList`)
    .then(res => res.data)
    .catch(err => {
      return err
    });
};

export const addTest = (body) => {
  return axios
    .post(`${api.url}/test/test`, body)
    .then(res => res.data)
    .catch(err => {
      return err;
    }); 
};