import React, { useState, useEffect } from 'react';
import { Table, Descriptions } from 'antd';
import useGetPrescriptionByAppointmentId from '../../../state/prescription/hooks/useGetPrescriptionByAppointmentId';
import queryString from 'query-string';
import usePatientById from '../../../state/patientSearch/hooks/usePatientSearchbyId';
import PatientDetails from '../../patientDetails';
const medicinecolumns = [
    {
        title: 'Medicine Name',
        dataIndex: 'medicineName',
    },
    {
        title: 'Dosage',
        dataIndex: 'dosage',
    },
    {
        title: 'Days',
        dataIndex: 'days',
    },
    {
        title: 'Comment',
        dataIndex: 'comment',
    },
];
const medicineData = [
    // {
    //     key: '1',
    //     medicineName: 'meds',
    //     dosage: 'meds',
    //     days: 'meds',
    //     comment: 'meds',
    // }
];

const testcolumns = [
    {
        title: 'Test Name',
        dataIndex: 'testName',
    },
    {
        title: 'Test Date',
        dataIndex: 'dateOfBooking',
    },
    {
        title: 'Report Date',
        dataIndex: 'dateOfResult',
    },
    {
        title: 'Doctor comment',
        dataIndex: 'testDesc',

    },
    {
        title: 'Report Summary',
        dataIndex: 'reportDesc',

    }
];
const testData = [
    // {
    //     key: '1',
    //     testName: 'test',
    //     dateOfBooking: 'test',
    //     dateOfResult: 'test',
    //     reportDesc: 'test',
    //     testDesc: 'test',
    // }
];

const ViewPrescription = ({ location, history }) => {
    let appointmentDetails = {
        appointmentId: '',
        diseaseDesc: '',
        advise: '',
        patientId: '',
        patientName: '',
        doctorId: '',
        height: '',
        weight: '',
        Bp: '',
        createdAt: '',
        appointmentDate: '',
        timeSlot: '',
        status: '',
        temperature: ''
    };

    const queryParams = queryString.parse(location.search);
    const [prescriptionDetails, setPrescriptionDetails] = useGetPrescriptionByAppointmentId();
    const [patientDetails, isLoading, setPatientSearchById] = usePatientById(queryParams.patientId);
    useEffect(() => {
        setPrescriptionDetails(queryParams.appointmentId);
        setPatientSearchById(queryParams.patientId);
    }, []);

    if (prescriptionDetails != null) {
        console.log(prescriptionDetails);
        if (prescriptionDetails.appointmentDto != null) {
            const appointmentDto = prescriptionDetails.appointmentDto;
            console.log('le bhgat', appointmentDto);
            appointmentDetails = {
                appointmentId: appointmentDto.appointmentId,
                diseaseDesc: appointmentDto.diseaseDesc,
                advise: appointmentDto.advise,
                patientId: appointmentDto.patientId,
                patientName: appointmentDto.patientName,
                doctorId: appointmentDto.doctorId,
                height: appointmentDto.height,
                weight: appointmentDto.weight,
                Bp: appointmentDto.Bp,
                createdAt: appointmentDto.createdAt,
                appointmentDate: appointmentDto.appointmentDate,
                timeSlot: appointmentDto.timeSlot,
                status: appointmentDto.status,
            }
        }

        if (prescriptionDetails.prescribedMedsDtoList != null) {
            prescriptionDetails.prescribedMedsDtoList.forEach((medicine, index) => {
                medicineData.push({
                    key: medicine.medName + index,
                    medicineName: medicine.medName,
                    dosage: medicine.dosage,
                    days: medicine.days,
                    comment: medicine.comment

                });
            });
        }
        if (prescriptionDetails.prescribedTestingDtoList != null) {
            prescriptionDetails.prescribedTestingDtoList.forEach((test, index) => {
                testData.push({
                    key: test + index,
                    testName: test.testName,
                    dateOfBooking: test.dateOfBooking,
                    dateOfResult: test.dateOfResult,
                    reportDesc: test.reportDesc,
                    testDesc: test.testDesc,
                });
            });
        }
    }
    return (
        <>
            <h4>Patient Info</h4>
            <br />
            <Descriptions title="" layout="Horizontal">
                <Descriptions.Item label="Name">{patientDetails.patientName} </Descriptions.Item>
                <Descriptions.Item label="Age">{patientDetails.age}</Descriptions.Item>
                <Descriptions.Item label="AppointmentId">{appointmentDetails.appointmentId}</Descriptions.Item>
                <Descriptions.Item label="Visit Type">{patientDetails.visitType}</Descriptions.Item>
            </Descriptions>
            <br />
            <h4>Patient Vitals</h4>
            <br />
            <Descriptions title="" layout="Horizontal">
                <Descriptions.Item label="Height">{appointmentDetails.height}</Descriptions.Item>
                <Descriptions.Item label="Weight">{appointmentDetails.weight}</Descriptions.Item>
                <Descriptions.Item label="BP">{appointmentDetails.Bp}</Descriptions.Item>
                <Descriptions.Item label="Temperature">{appointmentDetails.temperature}</Descriptions.Item>
                <Descriptions.Item label="Disease description">{appointmentDetails.diseaseDesc}</Descriptions.Item>
                <Descriptions.Item label="Advice">{appointmentDetails.advise}</Descriptions.Item>
            </Descriptions>
            <br />
            <h4>Prescribed Medicines</h4>
            <Table columns={medicinecolumns} dataSource={medicineData} size="middle" />
            <hr />
            <h4>Prescribed Tests</h4>
            <Table columns={testcolumns} dataSource={testData} size="middle" />
            <hr />
        </>

    );
};

export default ViewPrescription;