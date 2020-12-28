import axios from 'axios';
import api from '../../../utils/services';

export const savePharmacyMedicine  = async (body) => {
    return axios
        .post(`${api.url}/pharmacyController/saveOrUpdatePharmacyMedicine`, body)
        .then(res => res.data)
        .catch(err => {
            return err;
        });
};

export const getPharmacyMedicine = async () => {
    return axios
        .get(`${api.url}/pharmacyController/getMedicineList`)
        .then(res => res.data)
        .catch(err => {
            return err;
        });
};