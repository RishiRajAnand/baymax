import React from 'react';
import { Divider, Descriptions, Badge } from 'antd';
import usePatientSearchbyId from '../../state/patientSearch/hooks/usePatientSearchbyId';

const PatientDetails = (prop) => {
    // const [patient, isLoading, setRequest] = usePatientSearchbyId();

    // useEffect(() => {
    //     if(prop.patientId != null) {
    //         setRequest(prop.patientId);
    //     }
    // }, [prop.patientId]);

    return (
        <>
            <Divider>Patient Details</Divider>
            <Descriptions bordered>
                <Descriptions.Item label="Name">{prop.patientDetails.patientName}</Descriptions.Item>
                <Descriptions.Item label="Visit Type">{prop.patientDetails.visitType}</Descriptions.Item>
                <Descriptions.Item label="Age">{prop.patientDetails.age}</Descriptions.Item>
                <Descriptions.Item label="Contact">{prop.patientDetails.contactNum}</Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                    <Badge status="success" text="Active" />
                </Descriptions.Item>
            </Descriptions>
        </>);
};

export default PatientDetails;
