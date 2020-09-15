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
