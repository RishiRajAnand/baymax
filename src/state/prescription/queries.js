import axios from 'axios';
import api from '../../utils/services';

export const savePrescription = (body) => {
    return axios
        .post(`${api.url}/doctorService/savePrescription`, body)
        .then(res => res.data)
        .catch(err => {
            return err;
        });
};
