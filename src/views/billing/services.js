import axios from 'axios';
import api from '../../utils/services';

export const getBillDetails = (patientId) => {
    return axios
        .get(`${api.url}/HMServiceController/fetchBillDtails?billId=&patientId=` + patientId)
        .then(res => res.data)
        .catch(err => {
            return err;
        });
};