import React, { useState } from 'react';
import { Divider, Descriptions, DatePicker, Badge, Form, Input, Button, Space, Select, InputNumber, AutoComplete } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import queryString from 'query-string';
import useMedicineSearch from '../../../state/addMedicine/hooks/useSearchMedicine';
import '../../prescription/prescription.css';

const onFinish = values => {
    console.log('Received values of form:', values);
};

const { Option } = Select;

const renderTitle = (title: string) => {
    return (
        <span>
            {title}
            <a
                style={{ float: 'right' }}
                href="https://www.google.com/search?q=antd"
                target="_blank"
                rel="noopener noreferrer"
            >
                more
        </a>
        </span>
    );
};

const renderItem = (title: string, count: number) => {
    return {
        value: title,
        label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {title}
                <span>
                    <UserOutlined /> {count}
                </span>
            </div>
        ),
    };
};

const PrescribeMedicine = () => {
    let options = [];
    // const [result, setResult] = useState([]);
    const [medicines, isLoadings, setMedicineSearch] = useMedicineSearch();
    
    const handleSearch = (value) => {
        setMedicineSearch();
    };

    if (medicines.length > 0) {
        var map = new Map();

        medicines.forEach(medicine => {
            if (map.has(medicine.medicineType)) {
                map.set(medicine.medicineType, [...map.get(medicine.medicineType), medicine.medicineName]);
            } else {
                map.set(medicine.medicineType, [medicine.medicineName])
            }
        });
        console.log(map);
        for (let [key, value] of map) {
            console.log(key + " = " + value);
            options.push({
                label: renderTitle(key),
                options: value.map(val => renderItem(val, 100)),
            });
        }

    }

    return (
        <>
            <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                <Form.List name="users">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map((field, index) => (
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'medicineName']}
                                            fieldKey={[field.fieldKey, 'medicineName']}
                                            rules={[{ required: true, message: 'Missing Medicine name' }]}
                                        >
                                            <AutoComplete
                                                onSearch={handleSearch}
                                                dropdownClassName="certain-category-search-dropdown"
                                                dropdownMatchSelectWidth={500}
                                                style={{ width: 250 }}
                                                options={options}
                                            >
                                                <Input.Search size="default" placeholder="Medicine" />
                                            </AutoComplete>
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'dosage']}
                                            fieldKey={[field.fieldKey, 'dosage']}
                                            rules={[{ required: true, message: 'Missing Dosage' }]}
                                        >
                                            <Select
                                                placeholder="Dosage per day (M-A-N)"
                                                allowClear>
                                                <Option value="1-0-0">1-0-0</Option>
                                                <Option value="1-1-0">1-1-0</Option>
                                                <Option value="1-1-1">1-1-1</Option>
                                                <Option value="0-0-1">0-0-1</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'numberOfDays']}
                                            fieldKey={[field.fieldKey, 'numberOfDays']}
                                            rules={[{ required: true, message: 'Missing Number of days' }]}
                                        >
                                            <InputNumber />
                                        </Form.Item>
                                        <MinusCircleOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => {
                                            add();
                                        }}
                                        block
                                    >
                                        <PlusOutlined /> Add Medicines
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>

                {/* <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
        </Button>
                </Form.Item> */}
            </Form>
        </>);
};

export default PrescribeMedicine;
