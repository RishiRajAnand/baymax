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
    const [selectedValue, setSelectedValue] = useState("");
    const [medicines, isLoading, setMedicineSearch] = useGetPharmacyMedicines();
    const [tests, isLoading1, setTestSearch] = useTestSearch();
    // const [options, isLoading, setMedicineSearch] = useGetPharmacyMedicines();
    useEffect(() => {
        setMedicineSearch();
    }, []);

    if (selected == "test") {
        options = [...tests.map(test => {
            testMap.set(test.testName, test);
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
        const obj = {
            itemId: null,
            name: selectedValue,
            quantity: value.user.quantity,
            itemType: selected,
            amount: amount
        }
        if (selected == "medicine") {
            const medicinedetail = medicineMap.get(value.user.name);
            obj["amount"] = medicinedetail.salePrice;
            obj["itemId"] = medicinedetail.medicineId;

        } else if (selected == "test") {
            const testdetail = testMap.get(value.user.name);
            obj["amount"] = testdetail.price;
            obj["itemId"] = null;
        }

        props.onItemAdded(obj);
    }
    function onItemTypeSelect(value) {
        setSelected(value);
        if (value == "test") {
            setTestSearch();
        }
    }
    function onSelect(data) {
        setSelectedValue(data);
    }
    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} >
            <Form.Item name={['user', 'name']} label="Item name">
                <AutoComplete
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={200}
                    style={{ width: '100%' }}
                    options={options}
                    onSelect={onSelect}
                    filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                >
                    <Input.Search size="default" placeholder="Item name" />
                </AutoComplete>
            </Form.Item>
            <Form.Item name={['user', 'quantity']} label="Quantity" rules={[{ type: 'number' }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'itemType']} label="Item type" >
                <Select onSelect={onItemTypeSelect} defaultValue={selected} placeholder="Item type">
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