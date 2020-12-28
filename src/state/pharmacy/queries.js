import axios from 'axios';
import api from '../../utils/services';

export const savePharmacyMedicine = (body) => {
    return axios
        .post(`${api.url}/pharmacyController/saveOrUpdatePharmacyMedicine`, body)
        .then(res => res.data)
        .catch(err => {
            return err;
        });
};

export const saveSupplier = (body) => {
    return axios
        .post(`${api.url}/pharmacyController/saveSupplier`, body)
        .then(res => res.data)
        .catch(err => {
            return err;
        });
};

export const savePurchaseOrder = (body) => {
    return axios
        .post(`${api.url}/pharmacyController/savePurchaseOrder`, body)
        .then(res => res.data)
        .catch(err => {
            return err;
        });
};

export const getPurchaseOrderList = () => {
    return axios
        .get(`${api.url}/pharmacyController/getPurchaseOrderList`)
        .then(res => res.data)
        .catch(err => {
            return err;
        });
};

export const getSuppliersList = () => {
    return axios
        .get(`${api.url}/pharmacyController/getSupplierList`)
        .then(res => res.data)
        .catch(err => {
            return err;
        });
};

export const getPharmacyMedicineList = () => {
    return axios
        .get(`${api.url}/pharmacyController/getMedicineList`)
        .then(res => res.data)
        .catch(err => {
            return err;
        });
};

export const getPharmacyMedicineDetail = (medicineId) => {
    return axios
        .get(`${api.url}/pharmacyController/getMedicineDetails?medicineId=` + medicineId)
        .then(res => res.data)
        .catch(err => {
            return err;
        });
};