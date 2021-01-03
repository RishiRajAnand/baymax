import axios from 'axios';
import api from '../../utils/services';

const rootURI = `${api.url}/HMServiceController/fetchBillDtails`;
export const searchBillDetails = (id, filterType) => {
    let url = '';
    if (filterType === 'patientId') {
        url = `${rootURI}?patientId=` + id + '&billId=';
    } else if (filterType === 'billId') {
        url = `${rootURI}?billId=` + id + '&patientId=';
    } else if (filterType === 'receiptId') {
        url = `${rootURI}?billId=` + id + '&patientId=';
    }
    return axios
        .get(url)
        .then(res => res.data)
        .catch(err => {
            return err.response;
        });
};

export const saveGenerateBill = (body) => {
    return axios
        .post(`${api.url}/HMServiceController/generateBill`, body)
        .then(res => res.data)
        .catch(err => {
            return err;
        });
};
