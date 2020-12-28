import { useState } from 'react';
import { getPharmacyMedicineDetail } from '../queries';

const useGetPharmacyMedicineDetail = () => {
    const [medicines, setMedicineList] = useState(null);

    const request = async (medicineId) => {
        const response = await getPharmacyMedicineDetail(medicineId);
        if (response) {
            setMedicineList(response);
        } else {
            // const err = [];
            setMedicineList(null);
        }
    };

    return [medicines, request];
};

export default useGetPharmacyMedicineDetail;