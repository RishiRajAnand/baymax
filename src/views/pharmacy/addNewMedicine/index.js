import React, { useState, useEffect } from 'react';
import { PlusOutlined, OrderedListOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Input, Row, Col, Divider, InputNumber, Button, Upload, Select, notification, DatePicker } from 'antd';
import { medicineDistributionUnits } from './utils';
import queryString from 'query-string';
import useSavePharmacyMedicine from '../../../state/pharmacy/hooks/useSavePharmacyMedicine';
import useGetPharmacyMedicineDetail from '../../../state/pharmacy/hooks/useGetMedicinedetail';
const { Option } = Select;
const { TextArea } = Input;
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 9 },
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
    const [items, setItems] = useState(['Aspirin', 'Tablets', 'Syrup']);
    const [status, setRequest] = useSavePharmacyMedicine();
    const [medicineDetail, setRequest1] = useGetPharmacyMedicineDetail();
    const queryParams = queryString.parse(location.search);
    useEffect(() => {
        if (status) {
            notification["success"]({
                message: 'SUCCESS',
                description: 'Medicine added successfully',
                duration: 3
            });
        }
        if (queryParams.mode == "edit" && queryParams.medicineId != null) {
            setRequest1(queryParams.medicineId);
        }
        form.setFieldsValue({
            user: { medicineName: "dasas" }
        });
    }, [status]);

    if (medicineDetail != null) {
        form.setFieldsValue({
            user: {
                medicineId: medicineDetail.medicineId,
                medicineName: medicineDetail.medicineName,
                genericName: medicineDetail.genericName,
                boxSize: medicineDetail.boxSize,
                expDate: medicineDetail.expiryDate,
                medicineShelf: medicineDetail.medicineShelf,
                details: medicineDetail.details,
                category: medicineDetail.category,
                unit: medicineDetail.unit,
                triggerValue: medicineDetail.triggerValue,
                image: medicineDetail.image,
                salePrice: medicineDetail.salePrice,
                supplierPrice: medicineDetail.suppliersPrice,
                tax: medicineDetail.tax,
                supplierName: medicineDetail.supplierName,
                availability: "Available"
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
            expDate: form.expiryDate,
            medicineShelf: form.medicineShelf,
            details: form.details,
            category: form.category,
            unit: form.unit,
            triggerValue: form.triggerValue,
            image: form.image,
            salePrice: form.salePrice,
            supplierPrice: form.suppliersPrice,
            tax: form.tax,
            supplierName: form.supplierName,
            availability: "Available"
        };

        if (queryParams.mode == "edit" && queryParams.medicineId != null) {
            body["medicineId"] = queryParams.medicineId;
        }
        setRequest(body);
    };
    function onNameChange(event) {
        // console.log("sas", event.target.value);
        setName(event.target.value);
    };
    function addItem() {
        setName('');
        setItems([...items, name || `New item ${index++}`]);
    }
    return (
        <>
            <Button onClick={() => {
                            history.push({ pathname: '/home/manageSuppliers'});
                        }} type="dashed" icon={<PlusOutlined />}>Add Supplier</Button>
            <Button type="dashed" onClick={() => {
                            history.push({ pathname: '/home/manageMedicines'});
                        }} style={{ marginLeft: '15px' }} icon={<OrderedListOutlined />}>Manage Medicine</Button>
            <Button type="dashed" style={{ marginLeft: '15px' }} icon={<OrderedListOutlined />}>Import Medicine</Button>
            <br /><br /><br />
            <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
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
                    <Col span={12}>
                        <Form.Item name={['user', 'expiryDate']} label="Expiry Date">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'medicineShelf']} label="Medicine Shelf">
                            <Input />
                        </Form.Item>
                    </Col>
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
                                    <Option key={item}>{item}</Option>
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
                        <Form.Item name={['user', 'salePrice']} label="Sale Price" rules={[{ required: true }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider orientation="left">Purchase Details</Divider>
                <Row gutter={24}>
                <Col span={12}>
                        <Form.Item name={['user', 'supplierName']} label="Supplier Name">
                            <Select
                                showSearch
                                placeholder="Select Suppliers Name" style={{ width: '100%' }}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>

                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item name={['user', 'purchaseQuantity']} label="Purchase quantity" rules={[{ type: 'number', min: 0, max: 5000 }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'purchaseUnit']} label="Purchase Unit">
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
                        <Form.Item name={['user', 'suppliersPrice']} label="Suppliers Price" rules={[{ required: true }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'tax']} label="Tax (%)">
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
