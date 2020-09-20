import { useState } from 'react';
import { searchBillDetails } from '../queries';

const useBillSearch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [patients, setPatients] = useState({});

    const request = async (patientId, filter) => {
        setIsLoading(true);

        const response = await searchBillDetails(patientId, filter);
        if (response) {
            setPatients(response);
        } else {
            // const err = [];
            setPatients(null);
        }
        setIsLoading(false);
    };

    return [patients, isLoading, request];
};

export default useBillSearch;
