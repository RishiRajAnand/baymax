import { useState } from 'react';
import { getPurchaseOrderDetails } from '../queries';

const useGetPurchaseOrderDetails = () => {
    const [medicines, setMedicineList] = useState(null);

    const request = async (medicineId) => {
        const response = await getPurchaseOrderDetails(medicineId);
        if (response) {
            setMedicineList(response);
        } else {
            // const err = [];
            setMedicineList(null);
        }
    };

    return [medicines, request];
};

export default useGetPurchaseOrderDetails;