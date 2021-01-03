import React, { useState, useEffect } from 'react';
import { Form, Input, Button, InputNumber, Radio, Divider, Descriptions, Select, Badge, Table, Row, Col, AutoComplete } from 'antd';
import useGetPharmacyMedicines from '../../../state/pharmacy/hooks/useGetAllPharmacyMedicines';
import useTestSearch from '../../../state/addMedicine/hooks/useSearchTest';
const { Option } = Select;

const AddItem = (props) => {
    const medicineMap = new Map();
    const testMap = new Map();
    let options = [
        // { value: 'light', label: 'Light' },
        // { value: 'bamboo', label: 'Bamboo' },
    ];
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const [selected, setSelected] = useState("medicine");
    const [medicines, isLoading, setMedicineSearch] = useGetPharmacyMedicines();
    const [tests, isLoading1, setTestSearch] = useTestSearch();
    // const [options, isLoading, setMedicineSearch] = useGetPharmacyMedicines();
    useEffect(() => {
        setMedicineSearch();
    }, []);

    if (selected == "test") {
        options = [...tests.map(test => {
            testMap.set();
            return { value: test.testName, label: test.testName };
        })];
    } else if (selected == "medicine") {
        if (medicines.length > 0) {
            
            medicines.forEach(medicine => {
                medicineMap.set(medicine.medicineName, medicine);
                options.push({ value: medicine.medicineName, label: medicine.medicineName });
            });
        }
    } else if (selected == "consultation") {
        if (medicines.length > 0) {
            medicines.forEach(medicine => {
                options.push({ value: medicine.medicineName, label: medicine.medicineName });
            });
        }
    }

    function onFinish(value) {
        let amount = 0;
        if(selected == "medicine") {
         amount = medicineMap.get(value.user.name).salePrice;
        } else if (selected == "test") {

        }
        const obj = {
            itemId: "",
            name : value.user.name,
            quantity : value.user.quantity,
            amount: amount
        }
        props.onItemAdded(obj);
    }
    function onItemTypeSelect(value) {
        setSelected(value);
        if (value == "test") {
            setTestSearch();
        }
    }

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} >
            <Form.Item name={['user', 'name']} label="Item name" rules={[{ required: true }]}>
                <AutoComplete
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={500}
                    style={{ width: '100%' }}
                    options={options}
                >
                    <Input.Search size="default" placeholder="Item name" />
                </AutoComplete>
            </Form.Item>
            <Form.Item name={['user', 'quantity']} label="Quantity" rules={[{ type: 'number' }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'itemType']} label="Item type" >
                <Select onSelect={onItemTypeSelect} defaultValue="medicine" placeholder="Item type">
                    <Option value="medicine">Medicine</Option>
                    <Option value="test">Test</Option>
                    <Option value="consulation">Consulation</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Item
                </Button>
            </Form.Item>
        </Form>);
};
export default AddItem;