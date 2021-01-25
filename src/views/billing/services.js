import axios from 'axios';
import api from '../../utils/services';

export const getBillDetails = (searchValue, searchBy) => {

    let searchURL = "";

    if (searchBy == "patientId") {
        searchURL = `${api.url}/HMServiceController/fetchBillDtails?billId=&patientId=` + searchValue;
    } else if (searchBy == "billId") {
        searchURL = `${api.url}/HMServiceController/fetchBillDtails?patientId=&billId=` + searchValue;
    }
    return axios
        .get(searchURL)
        .then(res => res.data)
        .catch(err => {
            return err;
        });
};