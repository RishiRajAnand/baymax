import axios from 'axios';
import api from '../../utils/services';
import BarcodeCustomize from '../../views/pharmacy/addNewMedicine/components/barcodeCustomize';

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

export const getBillListByDateRange = (toDate, fromDate, billType) => {
    return axios
        .get(`${api.url}/HMServiceController/fetchBillListByDateRange?toDate=` + toDate + '&fromDate=' + fromDate + '&billType=' + billType)
        .then(res => res.data)
        .catch(err => {
            return err;
        });
};

export const getItemDetailsByBarcode = (barcodeNumber) => {
    return axios
        .get(`${api.url}/pharmacyController/getMedicineDetailsByBarcodeNumber?barcodeNum=` + barcodeNumber)
        .then(res => res.data)
        .catch(err => {
            return err;
        });
};
