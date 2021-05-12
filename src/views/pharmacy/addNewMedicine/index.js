import React, { useState, useEffect, useRef } from 'react';
import { PlusOutlined, OrderedListOutlined, UploadOutlined, EditOutlined } from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';
import { Form, Input, Row, Col, Divider, InputNumber, Modal, Button, Card, Upload, Select, notification, DatePicker } from 'antd';
import { medicineDistributionUnits } from './utils';
import queryString from 'query-string';
import useSavePharmacyMedicine from '../../../state/pharmacy/hooks/useSavePharmacyMedicine';
import useGetPharmacyMedicineDetail from '../../../state/pharmacy/hooks/useGetMedicinedetail';
import { setNestedObjectValues } from 'formik';
import { saveItemCategory, getCategoriesList, savePharmacyMedicine, getItemUnitsList, saveItemUnit, getPharmacyMedicineDetail } from '../../../state/pharmacy/queries';
import { BarcodePrint } from './components/barcodePrint';
import BarcodeCustomize from './components/barcodeCustomize';
import { FULL_BARCODE } from '../../../utils/barcodeTypes';
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

// const medicineUnits = medicineDistributionUnits.map(medicineDistributionUnit => <Option key={medicineDistributionUnit}>{medicineDistributionUnit}</Option>);
const AddNewMedicine = ({ location, history }) => {
    let index = 0;
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const [form] = Form.useForm();
    const [isBarcodeModalVisible, setIsBarcodeModalVisible] = useState(false);
    const [ barcodeIncludes, setbarcodeIncludes] = useState(['productName', 'productPrice']);
    
    const [name, setName] = useState("");
    const [mode, setMode] = useState("");
    const [newItemUnit, setNewItemUnit] = useState("");
    const [items, setItems] = useState([]);
    const [itemUnits, setItemUnits] = useState([]);
    const [medicineDetail, setRequest1] = useGetPharmacyMedicineDetail();
    const [barcodeDetails, setBarcodeDetails] = useState({});
    const queryParams = queryString.parse(location.search);
    useEffect(() => {
        if (queryParams.mode == "preview" && queryParams.medicineId != null) {
            // setRequest1(queryParams.medicineId);
            setMedicineDetails(queryParams.medicineId);
            setMode("preview");
        }
        intialiseCategories();
        intialiseItemUnits();
    }, []);

    function setMedicineDetails(medicineId) {
        getPharmacyMedicineDetail(medicineId).then(medicineDetail => {
            if (medicineDetail != null) {
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
                        supplierPrice: medicineDetail.supplierPrice,
                        tax: medicineDetail.tax,
                        supplierName: medicineDetail.supplierName,
                        availability: medicineDetail.availability,
                        stockQuantity: medicineDetail.stockQuantity,
                        barcodeNum: medicineDetail.barcodeNum
                    }
                });
                setBarcodeDetails({
                    barcode: medicineDetail.barcode,
                    barcodeNum: medicineDetail.barcodeNum,
                    productName: medicineDetail.medicineName,
                    productPrice: `${Number.parseFloat(medicineDetail.salePrice)} per ${medicineDetail.unit}`,
                });
            }
        }).catch(err => {
            notification["error"]({
                message: 'Error',
                description: `Error while fetching details`,
                duration: 3
            });
        })
    }

    function intialiseCategories() {
        getCategoriesList().then(data => {
            if (Array.isArray(data)) {
                setItems(data);
            }
        });
    }
    function intialiseItemUnits() {
        getItemUnitsList().then(data => {
            if (Array.isArray(data)) {
                setItemUnits(data);
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
            barcode: barcodeDetails.barcode,
            barcodeNum: barcodeDetails.barcodeNum,
            supplierPrice: form.supplierPrice,
            availability: form.availability,
            stockQuantity: form.stockQuantity,
            // barcodeType: FULL_BARCODE
        };

        if (mode == "edit" && queryParams.medicineId != null) {
            body["medicineId"] = queryParams.medicineId;
        }
        console.log("bodyyyy", body);
        savePharmacyMedicine(body).then(data => {
            notification["success"]({
                message: 'SUCCESS',
                description: `Item ${form.medicineName} ${queryParams.mode == 'edit' ? 'edited' : 'added'} successfully`,
                duration: 3
            });
            setMode("preview");
            form.setFieldsValue({
                user: {
                    barcodeNum: data.BarcodeNumber
                }
            });
            setBarcodeDetails({
                barcode: data.BarcodeImage,
                barcodeNum: data.BarcodeNumber,
                productName: form.medicineName,
                productPrice: form.salePrice,
            });
            // clearForm();
        }).catch(err => {
            // notification["error"]({
            //     message: 'ERROR',
            //     description: `Error while saving Item`,
            //     duration: 3
            // });
        });
    };
    function onNameChange(event) {
        // console.log("sas", event.target.value);
        setName(event.target.value);
    };

    function onItemUnitNameChange(event) {
        setNewItemUnit(event.target.value);
    };
    function addItemCategory() {
        // setName('');
        const body = {
            categoryId: null,
            categoryName: name
        };
        saveItemCategory(body).then(data => {
            setItems([...items, { categoryId: null, categoryName: name } || `New item ${index++}`]);
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

    function addItemUnit() {
        const body = {
            id: null,
            unitName: newItemUnit
        };
        saveItemUnit(body).then(data => {
            setItemUnits([...itemUnits, { id: null, unitName: newItemUnit } || `New item ${index++}`]);
            notification["success"]({
                message: 'SUCCESS',
                description: `Item Unit ${newItemUnit} added successfully`,
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
                barcodeNum: "",
                triggerValue: 0,
                image: null,
                salePrice: 0,
                supplierPrice: 0,
                availability: "In stock",
                stockQuantity: 0
            }
        });
    }
    function onSaveBarcodeSetting(form) {
        console.log("formaaya", form);
        setbarcodeIncludes(form.includes);
        setIsBarcodeModalVisible(false);

    }
    function handleCancelBarcodeModal() {
        setIsBarcodeModalVisible(false);
    }
    return (
        <>
            <Row gutter={24}>
                <Col span={18}>
                    <Button onClick={() => {
                        history.push({ pathname: '/home/manageSuppliers' });
                    }} type="dashed" icon={<PlusOutlined />}>Add Supplier</Button>
                    <Button type="dashed" onClick={() => {
                        history.push({ pathname: '/home/manageMedicines' });
                    }} style={{ marginLeft: '15px' }} icon={<OrderedListOutlined />}>Manage Inventory</Button>
                    <Button type="dashed" style={{ marginLeft: '15px' }} icon={<OrderedListOutlined />}>Import Bulk Items</Button>
                </Col>
                <Col span={4}>
                    <Button onClick={() => {
                        setMode("edit");
                    }} type="dashed" icon={<EditOutlined />}>Edit</Button>
                </Col>
            </Row>

            <br /><br /><br />
            <Form form={form} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name={['user', 'availability']} label="Availability">
                            <Select
                                placeholder="Status"
                                allowClear
                                disabled={mode == "preview"}
                            >
                                <Option value="In stock">In Stock</Option>
                                <Option value="Out of stock">Out Of Stock</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'barcodeNum']} label="Barcode No.">
                            <Input disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name={['user', 'medicineName']} label="Item Name" rules={[{ required: true }]}>
                            <Input disabled={mode == "preview"} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'genericName']} label="Local Name">
                            <Input disabled={mode == "preview"} />
                        </Form.Item>
                    </Col>
                    {/* <Col span={12}>
                        <Form.Item name={['user', 'boxSize']} label="Box Size" rules={[{ type: 'number', min: 0, max: 5000 }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col> */}
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
                            <TextArea rows={2} disabled={mode == "preview"} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'category']} label="Category">
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Select category"
                                disabled={mode == "preview"}
                                dropdownRender={menu => (
                                    <div>
                                        {menu}
                                        <Divider style={{ margin: '4px 0' }} />
                                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                            <Input style={{ flex: 'auto' }} value={name} onChange={onNameChange} />
                                            <a
                                                style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                                onClick={addItemCategory}
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
                        <Form.Item name={['user', 'image']} label="Image">
                            <Upload name="logo" listType="picture">
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'stockQuantity']} label="Stock Quantity">
                            <InputNumber style={{ width: '100%' }} disabled={mode == "preview"} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'unit']} label="Unit">
                            <Select
                                disabled={mode == "preview"}
                                style={{ width: '100%' }}
                                placeholder="Select Item Unit"
                                dropdownRender={menu => (
                                    <div>
                                        {menu}
                                        <Divider style={{ margin: '4px 0' }} />
                                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                            <Input style={{ flex: 'auto' }} value={newItemUnit} onChange={onItemUnitNameChange} />
                                            <a
                                                style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                                onClick={addItemUnit}
                                            >
                                                <PlusOutlined /> Add item
                                    </a>
                                        </div>
                                    </div>
                                )}
                            >
                                {itemUnits.map(item => (
                                    <Option key={item.unitName}>{item.unitName}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'triggerValue']} label="Reorder value" rules={[{ type: 'number', min: 0, max: 5000 }]}>
                            <InputNumber style={{ width: '100%' }} disabled={mode == "preview"} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'salePrice']} label="Sale price per unit" rules={[{ required: true }]}>
                            <InputNumber style={{ width: '100%' }} disabled={mode == "preview"} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'supplierPrice']} label="MRP per unit">
                            <InputNumber style={{ width: '100%' }} disabled={mode == "preview"} />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider></Divider>
                <Row gutter={24}>
                    <Col span={4}>
                    </Col>
                    <Col span={8}>
                        <Card style={{ display: (barcodeDetails.barcode != null ? "block" : "none") }}
                            title="Barcode Image"
                            extra={
                                <span>
                                    <a onClick={() => { setIsBarcodeModalVisible(true); }} >Customize</a> |
                                    <a onClick={handlePrint} >Print</a>
                                </span>
                            }>
                            {/* <p>Card content</p> */}
                            <BarcodePrint ref={componentRef} barcodeDetails={barcodeDetails} includes={barcodeIncludes}/>
                        </Card>
                    </Col>
                    <Col span={10}>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                            <Button type="primary" htmlType="submit" disabled={mode == "preview"}>
                                Save
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Modal title="Barcode Settings" footer={null} visible={isBarcodeModalVisible} onCancel={handleCancelBarcodeModal}>
                <BarcodeCustomize onSave={onSaveBarcodeSetting} />
            </Modal>
        </>
    );
};



export default AddNewMedicine;
