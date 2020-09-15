import axios from 'axios';
import api from '../../utils/services';

export const getAllPatients = () => {
  return axios
    .get(`${api.url}/patient/patientsList`)
    .then(res => res.data)
    .catch(err => {
      return err;
    });
};
