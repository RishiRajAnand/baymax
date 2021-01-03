import React, { useEffect, useState } from 'react';
import { Divider, Descriptions, Badge } from 'antd';
import usePatientSearchbyId from '../../state/patientSearch/hooks/usePatientSearchbyId';

const PatientDetails = (prop) => {
    const [patient, isLoading, setRequest] = usePatientSearchbyId();

    useEffect(() => {
        setRequest(prop.patientId);
    }, [prop.patientId]);

    return (
        <>
            <Divider>Patient Details</Divider>
            <Descriptions bordered>
                <Descriptions.Item label="Name">{patient.patientName}</Descriptions.Item>
                <Descriptions.Item label="Visit Type">{patient.visitType}</Descriptions.Item>
                <Descriptions.Item label="Age">{patient.age}</Descriptions.Item>
                <Descriptions.Item label="Admission date">20th Sep 2020, 9:15 AM</Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                    <Badge status="warning" text="pending" />
                </Descriptions.Item>
            </Descriptions>
        </>);
};

export default PatientDetails;
