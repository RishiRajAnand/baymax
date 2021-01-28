import { Space, Table, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import useGetAllPharmacyMedicines from '../../../state/pharmacy/hooks/useGetAllPharmacyMedicines';
const { Search } = Input;
const { Option } = Select;

// const data = [
//     {
//         key: '1',
//         name: 'Paraceta',
//         category: '',
//         purchasePrice: '',
//         sellingPrice: '',
//         genericName: '',
//         expiryDate: '',
//         medicineId: '217',
//         stock: 100
//     },
//     {
//         key: '2',
//         name: '',
//         category: '',
//         purchasePrice: '',
//         sellingPrice: '',
//         genericName: '',
//         expiryDate: '',
//         medicineId: '217'

//     },
//     {
//         key: '3',
//         name: '',
//         category: '',
//         purchasePrice: '',
//         sellingPrice: '',
//         genericName: '',
//         expiryDate: '',
//         medicineId: '217'

//     },
// ];

const ManageMedicines = ({ location, history }) => {
    let data = [];
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <a>{(record.stockQuantity - record.triggerValue > 0 ? text : 'khatam ho gya')}</a>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            filters: [
                {
                    text: 'Tablet',
                    value: 'Tablet',
                },
                {
                    text: 'Syrup',
                    value: 'Syrup',
                }
            ],
            onFilter: (value, record) => record.category == value,
            sorter: (a, b) => a.category - b.category,
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
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Stock Quantity',
            dataIndex: 'stockQuantity',
            key: 'stockQuantity',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => {
                        history.push({ pathname: '/home/newPurchaseOrder', search: '?mode=prefetch' + '&medicineName=' + record.name });
                    }}>Place Order</a>
                    {/* <a>Stock</a> */}
                    <a onClick={() => {
                        history.push({ pathname: '/home/addNewMedicine', search: '?mode=edit' + '&medicineId=' + record.medicineId });
                    }}>Edit</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    const [medicines, isLoading, setMedicineSearch] = useGetAllPharmacyMedicines();
    const [filterValue, setfilterValue] = useState("medicineName");
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
                triggerValue: medicine.triggerValue,
                sellingPrice: medicine.salePrice,
                genericName: medicine.genericName,
                expiryDate: medicine.expDate,
                stock: medicine.availability,
                stockQuantity: medicine.stockQuantity
            });
        });
        data = [...tempData];
    }

    function onMedicineSearch() {
        // if (searchValue == '') {
        //     setRequest();
        //     setShowPatient("all");
        // } else if (filterValue == "medicineName") {
        //     setPatientSearchbyId(searchValue);
        //     setShowPatient("patientId");
        // } else if (filterValue == "genericName") {
        //     setPatientSearchbyName(searchValue);
        //     setShowPatient("patientName");
        // }
    }
    return (
        <>
            <Input.Group compact>
                <Select defaultValue={filterValue} onSelect={setfilterValue}>
                    <Option value="medicineName">Medicine Name</Option>
                    <Option value="genericName">Generic Name</Option>
                </Select>
                <Input.Search onSearch={onMedicineSearch} style={{ width: '70%' }} placeholder="Search by" />
            </Input.Group>
            <br /><br />
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default ManageMedicines;