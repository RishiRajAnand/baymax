import React, { useState, useEffect } from 'react';
import { PlusOutlined, OrderedListOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Input, Row, Col, Divider, InputNumber, Button, Upload, Select, notification, DatePicker } from 'antd';
import { medicineDistributionUnits } from './utils';
import queryString from 'query-string';
import useSavePharmacyMedicine from '../../../state/pharmacy/hooks/useSavePharmacyMedicine';
import useGetPharmacyMedicineDetail from '../../../state/pharmacy/hooks/useGetMedicinedetail';
import { setNestedObjectValues } from 'formik';
import { saveItemCategory, getCategoriesList, savePharmacyMedicine } from '../../../state/pharmacy/queries';
const { Option } = Select;
const { TextArea } = Input;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
// eslint-disable-next-line
const validateMessages = {
    // eslint-disable-next-line
    required: '${label} is required!',
    types: {
        // eslint-disable-next-line
        email: '${label} is not validate email!',
        // eslint-disable-next-line
        number: '${label} is not a validate number!',
    },
    number: {
        // eslint-disable-next-line
        range: '${label} must be between ${min} and ${max}',
    },
};

const medicineUnits = medicineDistributionUnits.map(medicineDistributionUnit => <Option key={medicineDistributionUnit}>{medicineDistributionUnit}</Option>);
const AddNewMedicine = ({ location, history }) => {
    let index = 0;
    const [form] = Form.useForm();
    const [name, setName] = useState("");
    const [items, setItems] = useState([]);
    const [medicineDetail, setRequest1] = useGetPharmacyMedicineDetail();
    const queryParams = queryString.parse(location.search);
    useEffect(() => {
        if (queryParams.mode == "edit" && queryParams.medicineId != null) {
            setRequest1(queryParams.medicineId);
        }
        intialiseCategories();
    }, []);

    if (medicineDetail != null && queryParams.mode == "edit") {
        form.setFieldsValue({
            user: {
                medicineId: medicineDetail.medicineId,
                medicineName: medicineDetail.medicineName,
                genericName: medicineDetail.genericName,
                boxSize: Number.parseInt(medicineDetail.boxSize),
                expDate: medicineDetail.expiryDate,
                medicineShelf: medicineDetail.medicineShelf,
                details: medicineDetail.details,
                category: medicineDetail.category,
                unit: medicineDetail.unit,
                triggerValue: Number.parseFloat(medicineDetail.triggerValue),
                image: medicineDetail.image,
                salePrice: Number.parseFloat(medicineDetail.salePrice),
                supplierPrice: medicineDetail.suppliersPrice,
                tax: medicineDetail.tax,
                supplierName: medicineDetail.supplierName,
                availability: medicineDetail.availability,
                stockQuantity: medicineDetail.stockQuantity,
            }
        });
    }

    function intialiseCategories() {
        getCategoriesList().then(data => {
            if(data) {
                setItems(data);
            }
        });
    }
    const onFinish = formData => {
        const form = formData.user;
        console.log(form);
        const body = {
            medicineName: form.medicineName,
            genericName: form.genericName,
            boxSize: form.boxSize,
            details: form.details,
            category: form.category,
            unit: form.unit,
            triggerValue: form.triggerValue,
            image: form.image,
            salePrice: form.salePrice,
            availability: form.availability,
            stockQuantity: form.stockQuantity
        };

        if (queryParams.mode == "edit" && queryParams.medicineId != null) {
            body["medicineId"] = queryParams.medicineId;
        }

        savePharmacyMedicine(body).then(data => {
            notification["success"]({
                message: 'SUCCESS',
                description: `Medicine ${form.medicineName} ${queryParams.mode == 'edit' ? 'edited' : 'added'} successfully`,
                duration: 3
            });
            clearForm();
        }).catch(err => {
            notification["error"]({
                message: 'ERROR',
                description: `Error while saving Medicine`,
                duration: 3
            });
        });
    };
    function onNameChange(event) {
        // console.log("sas", event.target.value);
        setName(event.target.value);
    };
    function addItem() {
        // setName('');
        const body = {
            categoryId: null,
            categoryName: name
        };
        saveItemCategory(body).then(data => {
            setItems([...items, {categoryId: null, categoryName: name} || `New item ${index++}`]);
            notification["success"]({
                message: 'SUCCESS',
                description: `Category ${name} added successfully`,
                duration: 3
            });
        }).catch(err => {
            notification["error"]({
                message: 'ERROR',
                description: `Error while creating category`,
                duration: 3
            });
        });
    }
    function clearForm() {
        form.setFieldsValue({
            user: {
                medicineId: null,
                medicineName: "",
                genericName: "",
                boxSize: 0,
                details: "",
                category: "",
                unit: "",
                triggerValue: 0,
                image: null,
                salePrice: 0,
                availability: "In stock",
                stockQuantity: 0
            }
        });
    }
    return (
        <>
            <Button onClick={() => {
                history.push({ pathname: '/home/manageSuppliers' });
            }} type="dashed" icon={<PlusOutlined />}>Add Supplier</Button>
            <Button type="dashed" onClick={() => {
                history.push({ pathname: '/home/manageMedicines' });
            }} style={{ marginLeft: '15px' }} icon={<OrderedListOutlined />}>Manage Medicine</Button>
            <Button type="dashed" style={{ marginLeft: '15px' }} icon={<OrderedListOutlined />}>Import Medicine</Button>
            <br /><br /><br />
            <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name={['user', 'availability']} label="Availability">
                            <Select
                                placeholder="Status"
                                allowClear
                            >
                                <Option value="In stock">In Stock</Option>
                                <Option value="Out of stock">Out Of Stock</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'stockQuantity']} label="Stock Quantity">
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name={['user', 'medicineName']} label="Medicine Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'genericName']} label="Generic Name">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'boxSize']} label="Box Size" rules={[{ type: 'number', min: 0, max: 5000 }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    {/* <Col span={12}>
                        <Form.Item name={['user', 'expiryDate']} label="Expiry Date">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col> */}
                    {/* <Col span={12}>
                        <Form.Item name={['user', 'medicineShelf']} label="Medicine Shelf">
                            <Input />
                        </Form.Item>
                    </Col> */}
                    <Col span={12}>
                        <Form.Item name={['user', 'details']} label="Details">
                            <TextArea rows={2} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'category']} label="Category">
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Select category"
                                dropdownRender={menu => (
                                    <div>
                                        {menu}
                                        <Divider style={{ margin: '4px 0' }} />
                                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                            <Input style={{ flex: 'auto' }} value={name} onChange={onNameChange} />
                                            <a
                                                style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                                onClick={addItem}
                                            >
                                                <PlusOutlined /> Add item
                                    </a>
                                        </div>
                                    </div>
                                )}
                            >
                                {items.map(item => (
                                    <Option key={item.categoryName}>{item.categoryName}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'unit']} label="Unit">
                            <Select
                                showSearch
                                placeholder="Select Distribution Unit" style={{ width: '100%' }}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                {medicineUnits}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'image']} label="Image">
                            <Upload name="logo" action="/upload.do" listType="picture">
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'triggerValue']} label="Reorder value" rules={[{ type: 'number', min: 0, max: 5000 }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'salePrice']} label="Sale price per unit" rules={[{ required: true }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Save and Add another
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};



export default AddNewMedicine;
