import React, { useState, useEffect } from 'react';
import { Form, Input, Button, InputNumber, Radio, Divider, Descriptions, Select, Badge, Table, Row, Col, AutoComplete } from 'antd';
import useGetPharmacyMedicines from '../../../state/pharmacy/hooks/useGetAllPharmacyMedicines';
import useTestSearch from '../../../state/addMedicine/hooks/useSearchTest';
const { Option } = Select;

const AddItem = (props) => {
    const [form] = Form.useForm();
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
<<<<<<< HEAD

    const [selected, setSelected] = useState("inventory");
    const [selectedValue, setSelectedValue] = useState("");
=======
    const [selected, setSelected] = useState("others");
>>>>>>> 13bac11 (deploying reception)
    const [medicines, isLoading, setMedicineSearch] = useGetPharmacyMedicines();
    const [tests, isLoading1, setTestSearch] = useTestSearch();
    // const [options, isLoading, setMedicineSearch] = useGetPharmacyMedicines();
    useEffect(() => {
        setMedicineSearch();
        setFormdefaultValue();
    }, []);


    function setFormdefaultValue() {
        form.setFieldsValue({
            user: {
                quantity: 1,
                amount: 0,
            }
        });
    }
    if (selected == "test") {
        options = [...tests.map(test => {
            testMap.set(test.testName, test);
            return { value: test.testName, label: test.testName };
        })];
    } else if (selected == "inventory") {
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
        console.log("arakadra", value.user.name);
        const obj = {
            itemId: null,
            name: value.user.name,
            quantity: value.user.quantity,
            itemType: selected,
            amount: value.user.amount
        }
        if (selected == "inventory") {
            const medicinedetail = medicineMap.get(value.user.name);
            obj["amount"] = medicinedetail.salePrice;
            obj["itemId"] = medicinedetail.medicineId;

        } else if (selected == "test") {
            const testdetail = testMap.get(value.user.name);
            obj["amount"] = testdetail.price;
            obj["itemId"] = null;
        }
        // console.log(obj);
        props.onItemAdded(obj);
    }
    function onItemTypeSelect(value) {
        setSelected(value);
        if (value == "test") {
            setTestSearch();
        }
    }
    function onSelect(data) {
        if (selected == "medicine") {
            const medicinedetail = medicineMap.get(data);
            console.log(medicinedetail.salePrice);
            form.setFieldsValue({
                user: {
                    amount: medicinedetail.salePrice,
                }
            });

        } else if (selected == "test") {
            const testdetail = testMap.get(data);
            form.setFieldsValue({
                user: {
                    amount: testdetail.salePrice,
                }
            });
        }
    }
    return (
        <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} >
            <Form.Item name={['user', 'name']} label="Item name">
                <AutoComplete
                    dropdownClassName="certain-category-search-dropdown"
                    autoFocus={true}
                    allowClear={true}
                    dropdownMatchSelectWidth={200}
                    style={{ width: '100%' }}
                    options={options}
                    onChange={onSelect}
                    filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                >
                    <Input.Search size="default" placeholder="Item name" />
                </AutoComplete>
            </Form.Item>
            <Form.Item name={['user', 'quantity']} label="Quantity" rules={[{ type: 'number' }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'amount']} label="Amount" rules={[{ type: 'number' }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'itemType']} label="Item type" >
                <Select onSelect={onItemTypeSelect} defaultValue={selected} placeholder="Item type">
                    <Option value="inventory">Inventory</Option>
                    <Option value="consulation">Others</Option>
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