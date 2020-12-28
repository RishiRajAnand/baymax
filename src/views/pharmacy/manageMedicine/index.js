import { Space, Table } from 'antd';
import React, { useEffect } from 'react';
import useGetAllPharmacyMedicines from '../../../state/pharmacy/hooks/useGetAllPharmacyMedicines';


// const data = [
//     {
//         key: '1',
//         name: '',
//         category: '',
//         purchasePrice: '',
//         sellingPrice: '',
//         genericName: '',
//         expiryDate: '',
//     },
//     {
//         key: '2',
//         name: '',
//         category: '',
//         purchasePrice: '',
//         sellingPrice: '',
//         genericName: '',
//         expiryDate: '',

//     },
//     {
//         key: '3',
//         name: '',
//         category: '',
//         purchasePrice: '',
//         sellingPrice: '',
//         genericName: '',
//         expiryDate: '',

//     },
// ];

const ManageMedicines = ({ location, history }) => {
    let data = [];
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            filters: [
                {
                    text: 'Aspirin',
                    value: 'aspirin',
                },
                {
                    text: 'Painkillers',
                    value: 'painkiller',
                }
            ],
            onFilter: (value, record) => record.category.indexOf(value) === 0,
            sorter: (a, b) => a.category.length - b.category.length,
            sortDirections: ['descend'],
        },
        {
            title: 'Purchase Price',
            dataIndex: 'purchasePrice',
            key: 'purchasePrice',
        },
        {
            title: 'Selling Price',
            dataIndex: 'sellingPrice',
            key: 'sellingPrice',
        },
        {
            title: 'Generic name',
            dataIndex: 'genericName',
            key: 'genericName',
        },
        {
            title: 'Expiry date',
            dataIndex: 'expiryDate',
            key: 'expiryDate',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => {
                        history.push({ pathname: '/home/newPurchaseOrder', search: '?patientId=' + record.patientId + '&doctorId=' + record.doctorId + '&appointmentId=' + record.appointmentId });
                    }}>Place Order</a>
                    <a>Stock</a>
                    <a onClick={() => {
                        history.push({ pathname: '/home/addNewMedicine', search: '?mode=edit' + '&medicineId=' + record.medicineId });
                    }}>Edit</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    const [medicines, isLoading, setMedicineSearch] = useGetAllPharmacyMedicines();
    useEffect(() => {
        setMedicineSearch();
    }, []);

    if (medicines.length > 0) {
        const tempData = [];
        medicines.forEach((medicine, index) => {
            tempData.push({
                key: index,
                name: medicine.medicineName,
                medicineId: medicine.medicineId,
                category: medicine.category,
                purchasePrice: medicine.supplierPrice,
                sellingPrice: medicine.salePrice,
                genericName: medicine.genericName,
                expiryDate: medicine.expDate,
            });
        });
        data = [...tempData];
    }
    return (
        <>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default ManageMedicines;