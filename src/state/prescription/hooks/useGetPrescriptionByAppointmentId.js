import { useState } from 'react';
import { getPrescriptionByAppointmentId } from '../queries';

const useGetPrescriptionByAppointmentId = () => {
    const [medicines, setMedicineList] = useState(null);

    const request = async (appointmentId) => {
        const response = await getPrescriptionByAppointmentId(appointmentId);
        if (response) {
            setMedicineList(response);
        } else {
            // const err = [];
            setMedicineList(null);
        }
    };

    return [medicines, request];
};

export default useGetPrescriptionByAppointmentId;