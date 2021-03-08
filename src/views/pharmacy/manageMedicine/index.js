import { Space, Table, Input, Select, Typography, notification, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import useGetAllPharmacyMedicines from '../../../state/pharmacy/hooks/useGetAllPharmacyMedicines';
import { getPharmacyMedicineList, getPharmacyMedicineListByName, deleteMedicine, getCategoriesList } from '../../../state/pharmacy/queries';
import { SERVER_ERROR } from '../../../utils/constantMessages';
const { Text } = Typography;
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

    const [medicineData, setMedicineData] = useState([]);
    const [itemCategories, setItemCategories] = useState([]);
    const [medicines, isLoading, setMedicineSearch] = useGetAllPharmacyMedicines();
    const [filterValue, setfilterValue] = useState("medicineName");

    useEffect(() => {
        getAllMedicines();
        intialiseCategories();
    }, []);

    function intialiseCategories() {
        getCategoriesList().then(data => {
            if (data) {
                setItemCategories(data);
            }
        });
    }

    if (medicineData.length > 0) {
        const tempData = [];
        medicineData.forEach((medicine, index) => {
            tempData.push({
                key: index,
                name: medicine.medicineName,
                medicineId: medicine.medicineId,
                category: medicine.category,
                supplierPrice: medicine.supplierPrice,
                triggerValue: medicine.triggerValue,
                salePrice: medicine.salePrice,
                genericName: medicine.genericName,
                expDate: medicine.expDate,
                availability: medicine.availability,
                stockQuantity: medicine.stockQuantity
            });
        });
        data = [...tempData];
    }

    function onMedicineSearch(value) {
        getPharmacyMedicineListByName(value).then(data => {
            if (data) {
                setMedicineData([...data]);
            }
        }).catch(err => {
            notification["error"]({
                message: 'Error',
                description: `Error while searching`,
                duration: 3
            });
        });
    }

    function deleteMedicineRecord(medicineId) {
        deleteMedicine(medicineId).then(data => {
            getAllMedicines();
            notification["success"]({
                message: 'Success',
                description: 'Item deleted successfully',
                duration: 3
            });
        }).catch(err => {
            notification["error"]({
                message: 'Error',
                description: SERVER_ERROR,
                duration: 3
            });
        });
    }

    function getAllMedicines() {
        getPharmacyMedicineList().then(data => {
            setMedicineData([...data]);
        }).catch(err => {
            notification["error"]({
                message: 'Error',
                description: SERVER_ERROR,
                duration: 3
            });
        });
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Text type={record.stockQuantity - record.triggerValue > 0 ? 'success' : 'danger'}>{text}</Text>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            filters: itemCategories.map(data => { return { text: data.categoryName, value: data.categoryName } }),
            onFilter: (value, record) => record.category == value,
            sorter: (a, b) => a.category - b.category,
            sortDirections: ['descend'],
        },
        {
            title: 'Purchase Price',
            dataIndex: 'supplierPrice',
            key: 'supplierPrice',
        },
        {
            title: 'Selling Price',
            dataIndex: 'salePrice',
            key: 'salePrice',
        },
        {
            title: 'Common Name',
            dataIndex: 'genericName',
            key: 'genericName',
        },
        {
            title: 'Expiry date',
            dataIndex: 'expDate',
            key: 'expDate',
        },
        {
            title: 'Stock',
            dataIndex: 'availability',
            key: 'availability',
            render: text => (text == 'In stock' ? <Tag color='green' key={text}>{text.toUpperCase()}</Tag> : <Tag color='red' key={text}>{text.toUpperCase()}</Tag>)
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
                    <a onClick={() => {
                        deleteMedicineRecord(record.medicineId);
                    }}>Delete</a>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Input.Group compact>
                <Select defaultValue={filterValue} onSelect={setfilterValue}>
                    <Option value="medicineName">Item Name</Option>
                    <Option value="genericName">Common Name</Option>
                </Select>
                <Input.Search onSearch={onMedicineSearch} style={{ width: '70%' }} placeholder="Search by" />
            </Input.Group>
            <br /><br />
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default ManageMedicines;