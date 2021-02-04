import { MinusCircleOutlined, OrderedListOutlined, PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Col, DatePicker, Divider, Form, Input, InputNumber, notification, Row, Select, Space, Switch } from 'antd';
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import moment from 'moment';
import useGetAllSuppliers from '../../../state/pharmacy/hooks/useGetAllSupplier';
import useGetAllPharmacyMedicines from '../../../state/pharmacy/hooks/useGetAllPharmacyMedicines';
import useSavePurchaseOrder from '../../../state/pharmacy/hooks/useSavePurchaseOrder';
import useGetPurchaseOrderDetails from '../../../state/pharmacy/hooks/useGetPurchaseOrderDetails';
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

const NewPurchaseOrder = ({ location, history }) => {
    const medicineMap = new Map();
    let options = [];
    const supplierOptions = [
        // { value: 'light', label: 'Light' },
        // { value: 'bamboo', label: 'Bamboo' },
    ];
    let index = 0;
    const [purchaseDetailsForm] = Form.useForm();
    const [productListForm] = Form.useForm();
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [items, setItems] = useState(['ABC pharma', 'Medimex store']);
    const [suppliers, isLoadings, setSupplierSearch] = useGetAllSuppliers();
    const queryParams = queryString.parse(location.search);
    const [medicines, isLoading, setMedicineSearch] = useGetAllPharmacyMedicines();
    const [status, setSavePurchaseOrder] = useSavePurchaseOrder();
    const [orderDetail, setGetPurchaseOrderDetails] = useGetPurchaseOrderDetails();
    // const [purchaseOrderList, isLoading1, setPurchaseOrderListFetch] = UseGetAllPurchaseOrder();
    useEffect(() => {
        setMedicineSearch();
        setSupplierSearch();
        if (status && submitted) {
            notification["success"]({
                message: 'SUCCESS',
                description: 'Purchase order created successfully',
                duration: 3
            });
            setSubmitted(false);
        }
        if (queryParams.mode == "edit" && queryParams.purchaseOrderId != null && submitted == false && status == false) {
            setGetPurchaseOrderDetails(queryParams.purchaseOrderId);
        }
    }, [status, submitted]);


    if (orderDetail != null) {
        console.log(orderDetail);
        purchaseDetailsForm.setFieldsValue({
            user: {
                supplierName: orderDetail.supplierName,
                orderDate: moment(new Date(orderDetail.orderDate), 'YYYY-MM-DD'),
                storeName: orderDetail.storeName,
                status: orderDetail.status,
                invoiceNumber: orderDetail.invoiceNumber,
                deliveryDate: moment(new Date(orderDetail.deliveryDate), 'YYYY-MM-DD'),
                rol: orderDetail.rol
            }
        });
        productListForm.setFieldsValue({
            user: {
                totalAmount: orderDetail.totalAmount,
                totalGST: orderDetail.totalGST,
                totalDiscount: orderDetail.totalDiscount,
            }
        });
        if (orderDetail.productDetails != null) {
            const productList = [];
            orderDetail.productDetails.forEach(product => {
                productList.push({
                    productId: product.productId,
                    productName: product.productName,
                    quantity: product.quantity,
                    unit: product.unit,
                    purchaseCost: product.purchaseCost,
                    batchNumber: product.batchNumber,
                    expiryDate: moment(new Date(product.expiryDate), 'YYYY-MM-DD'),
                    discount: product.discount,
                    tax: product.tax,
                });
            });
            productListForm.setFieldsValue({
                users: [...productList]
            });
        }

    }
    if (suppliers.length > 0) {
        suppliers.forEach(supplier => {
            supplierOptions.push({ value: supplier.supplierName, label: supplier.supplierName });
        });
    }
    if (medicines.length > 0) {
        medicines.forEach(medicine => {
            options.push({ value: medicine.medicineName, label: medicine.medicineName });
            medicineMap.set(medicine.medicineName, medicine);
        });
    }
    if (queryParams.mode == "prefetch") {

        productListForm.setFieldsValue({
            users: [{
                productId: null,
                productName: queryParams.medicineName,
                quantity: 1,
                unit: "",
                purchaseCost: "",
                batchNumber: "",
                expDate: "",
                discount: "",
                tax: ""
            }]
        });
    }
    const onFinish = formData => {
        const purchaseDetails = purchaseDetailsForm.getFieldsValue().user;
        const productList = productListForm.getFieldsValue().users;
        const finalCharges = productListForm.getFieldsValue().user;
        const body = {
            purchaseOrderId: queryParams.purchaseOrderId,
            supplierName: purchaseDetails.supplierName,
            orderDate: purchaseDetails.orderDate,
            storeName: purchaseDetails.storeName,
            invoiceNumber: purchaseDetails.invoiceNumber,
            totalAmount: finalCharges.totalAmount,
            totalGST: finalCharges.totalGST,
            totalDiscount: finalCharges.totalDiscount,
            deliveryDate: purchaseDetails.deliveryDate,
            rol: purchaseDetails.rol,
            status: purchaseDetails.status,
            productDetails: [],
        };
        if (productList != null && productList.length > 0) {
            productList.forEach(product => {
                const medicine = medicineMap.get(product.productName);
                body.productDetails.push({
                    productId: product.productId,
                    purchaseOrderId: queryParams.purchaseOrderId,
                    medicineId: medicine.medicineId,
                    productName: product.productName,
                    batchNumber: product.batchNumber,
                    quantity: product.quantity,
                    unit: product.unit,
                    purchaseCost: product.purchaseCost,
                    discount: product.discount,
                    tax: product.tax
                });
            });
        }
        setSubmitted(true);
        setSavePurchaseOrder(body);
    };
    function onNameChange(event) {
        // console.log("sas", event.target.value);
        setName(event.target.value);
    };
    function addItem() {
        setName('');
        setItems([...items, name || `New item ${index++}`]);
    }

    const onSearchProduct = (value) => {
        // setMedicineSearch();
    }

    const onSearchSupplier = (value) => {
        // setSupplierSearch();
    }

    return (
        <>
            <Button onClick={() => {
                history.push({ pathname: '/home/purchaseOrderList' });
            }} type="dashed" style={{ marginLeft: '15px' }} icon={<OrderedListOutlined />}>Purchase list</Button>
            <Button onClick={() => {
                history.push({ pathname: '/home/manageMedicines' });
            }} type="dashed" style={{ marginLeft: '15px' }} icon={<OrderedListOutlined />}>Medicine list</Button>
            <br /><br /><br />
            <Form form={purchaseDetailsForm}  {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name={['user', 'rol']} label="ROL">
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'status']} label="Status">
                            <Select
                                placeholder="Status"
                                allowClear>
                                <Option value="orderPlaced">Order Placed</Option>
                                <Option value="delivered">Delivered</Option>
                                <Option value="cancelled">Cancelled</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item name={['user', 'supplierName']} label="Suppliers Name" rules={[{ required: true }]}>
                            <AutoComplete
                                onSearch={onSearchSupplier}
                                dropdownClassName="certain-category-search-dropdown"
                                dropdownMatchSelectWidth={500}
                                style={{ width: '100%' }}
                                options={supplierOptions}
                            >
                                <Input.Search size="default" placeholder="Supplier name" />
                            </AutoComplete>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'deliveryDate']} label="Delivery Date">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'invoiceNumber']} label="Invoice Number">
                            <Input style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'orderDate']} label="Order Date">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'storeName']} label="Store Name">
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Select Store"
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
                    {/* <Col span={12}>
                        <Form.Item name={['user', 'salesStartDate']} label="Sales Start Date">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name={['user', 'salesEndDate']} label="Sales End Date">
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col> */}
                </Row>
            </Form>

            <Form form={productListForm} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                <Form.List name="users">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map(field => (
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'productName']}
                                            fieldKey={[field.fieldKey, 'productName']}
                                            rules={[{ required: true, message: 'Missing Product Name!' }]}
                                        >
                                            <AutoComplete
                                                onSearch={onSearchProduct}
                                                dropdownClassName="certain-category-search-dropdown"
                                                dropdownMatchSelectWidth={500}
                                                style={{ width: 250 }}
                                                options={options}
                                            >
                                                <Input.Search size="default" placeholder="Product name" />
                                            </AutoComplete>
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'batchNumber']}
                                            fieldKey={[field.fieldKey, 'batchNumber']}
                                        >
                                            <Input style={{ minWidth: 150 }} placeholder="Batch No." />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'quantity']}
                                            fieldKey={[field.fieldKey, 'quantity']}
                                        >
                                            <InputNumber style={{ minWidth: 125 }} placeholder="Quantity" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'unit']}
                                            fieldKey={[field.fieldKey, 'unit']}
                                        >
                                            <Select
                                                placeholder="Unit"
                                                allowClear>
                                                <Option value="1-0-0">bottle</Option>
                                                <Option value="1-1-0">box</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'purchaseCost']}
                                            fieldKey={[field.fieldKey, 'purchaseCost']}
                                        >
                                            <InputNumber style={{ minWidth: 150 }} placeholder="Purchase Cost" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'expiryDate']}
                                            fieldKey={[field.fieldKey, 'expiryDate']}
                                        >
                                            <DatePicker />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'discount']}
                                            fieldKey={[field.fieldKey, 'discount']}
                                        >
                                            <InputNumber style={{ minWidth: 125 }} placeholder="discount" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'tax']}
                                            fieldKey={[field.fieldKey, 'tax']}
                                        >
                                            <InputNumber style={{ minWidth: 125 }} placeholder="tax" />
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
                                        <PlusOutlined /> Add Product
                </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item name={['user', 'totalGST']} label="Total GST">
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name={['user', 'totalDiscount']} label="Total Discount">
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item name={['user', 'totalAmount']} label="Total Amount">
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                            <Button style={{ marginLeft: '15px' }} type="primary">
                                Print
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </>
    );
};



export default NewPurchaseOrder;
