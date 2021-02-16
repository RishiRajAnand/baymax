import { Space, Table, Input, Select, Typography, notification, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAllDoctors } from '../../../state/patientSearch/queries';
import { getPharmacyMedicineListByName } from '../../../state/pharmacy/queries';
import { SERVER_ERROR } from '../../../utils/constantMessages';
import { departments } from '../../../utils/departmentList';
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

const ViewDoctors = ({ location, history }) => {
    let data = [];
    const columns = [
        {
            title: 'Name',
            dataIndex: 'doctorName',
            key: 'doctorName',
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            filters: departments.map(data => {
                return {
                    'text': data,
                    'value': data,
                }
            }),
            onFilter: (value, record) => record.department == value,
        },
        {
            title: 'Fees',
            dataIndex: 'consulationCharge',
            key: 'consulationCharge',
        },
        {
            title: 'Speciality',
            dataIndex: 'speciality',
            key: 'speciality',
        },
        // {
        //     title: 'Available',
        //     dataIndex: 'availability',
        //     key: 'availability',
        //     render: text => (text == 'AVAILABLE' ? <Tag color='green' key={text}>{text.toUpperCase()}</Tag> : <Tag color='red' key={text}>{text.toUpperCase()}</Tag>)
        // },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => {
                        history.push({ pathname: '/home/addDoctor', search: '?mode=edit' + '&doctorId=' + record.doctorId });
                    }}>Edit</a>
                </Space>
            ),
        },
    ];
    const [doctorList, setDoctorList] = useState([]);
    const [filterValue, setfilterValue] = useState("doctorName");
    useEffect(() => {
        getDoctorList();
    }, []);

    data = doctorList;
    function onDoctorSearch(value) {
        // getPharmacyMedicineListByName(value).then(data => {
        //     if (data) {
        //         setMedicineData([...data]);
        //     }
        // }).catch(() => {
        //     notification["error"]({
        //         message: 'Error',
        //         description: `Error while searching`,
        //         duration: 3
        //     });
        // });
    }

    // function deleteMedicineRecord(medicineId) {
    //     deleteMedicine(medicineId).then(data => {
    //         getAllMedicines();
    //         notification["success"]({
    //             message: 'Success',
    //             description: 'Medicine deleted successfully',
    //             duration: 3
    //         });
    //     }).catch(err => {
    //         notification["error"]({
    //             message: 'Error',
    //             description: SERVER_ERROR,
    //             duration: 3
    //         });
    //     });
    // }

    function getDoctorList() {
        getAllDoctors().then(data => { setDoctorList(data); }).catch(err => {
            notification["error"]({
                message: 'Error',
                description: SERVER_ERROR,
                duration: 3
            });
        });
    }
    return (
        <>
            <Input.Group compact>
                <Select defaultValue={filterValue} onSelect={setfilterValue}>
                    <Option value="doctorName">Doctor Name</Option>
                    <Option value="departmentName">Department Name</Option>
                </Select>
                <Input.Search onSearch={onDoctorSearch} style={{ width: '70%' }} placeholder="Search by" />
            </Input.Group>
            <br /><br />
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default ViewDoctors;