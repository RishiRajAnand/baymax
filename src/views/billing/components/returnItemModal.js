import React, { useState, useEffect, useRef, useContext } from 'react';
import { Form, Input, Select, Row, Col, Table, notification, Button } from 'antd';
import { saveGenerateBill } from '../../../state/billing/queries';
const EditableContext = React.createContext();
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }

    return <td {...restProps}>{childNode}</td>;
};
const components = {
    body: {
        row: EditableRow,
        cell: EditableCell,
    },
};
const ReturnItem = (props) => {
    let errorMessagesRows = "";
    let returnButton = "";
    let printButton = "";
    let backToMainButton = "";
    const [initialRowData, setInitialRowData] = useState([]);
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState({});
    const [billGeneratedStatus, setBillGeneratedStatus] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    useEffect(() => {
        setData(props.rowsData);
        setInitialRowData(props.rowsData);
    }, []);

    let columns = [
        {
            title: 'Item Name',
            dataIndex: 'name',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            editable: "true",
            width: '10%',
        }
    ];
    columns = columns.map((col) => {
        if (col.editable == "false") {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleChangeFormField,
            }),
        };
    });
    if (billGeneratedStatus) {
        printButton = <Button style={{ width: '90%' }} type="primary">Print</Button>;
        backToMainButton = <Button onClick={() => { props.isModalVisible(false); }} style={{ width: '90%' }} type="primary">Go to Main Bill</Button>;
    }

    function updateMainBill() {
        const selectedRows = data.filter(d => selectedRowKeys.includes(d.key));
        props.onItemsReturned(selectedRows);
    }
    function handleChangeFormField(row) {
        console.log(row);
        console.log(initialRowData);

        const newData = [...data];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        const initialItemValue = initialRowData[index];
        if (row.quantity > initialItemValue.quantity) {
            const message = `Item ${row.name} cannot have quantity more than ${initialItemValue.quantity}`;
            setErrorMessage({ ...errorMessage, ... { [row.key]: message } });
        } else {
            const temp = { ...errorMessage };
            delete temp[row.key];
            setErrorMessage(temp);
        }
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        // const finalCharges = getFinalCharges([row]);
        // row.total = finalCharges.discountedAmount + finalCharges.totalGST;

        // calculateTotalCharges(newData);
    };
    console.log("error meessages", errorMessage);
    if (errorMessage) {
        const listOfErrors = [];
        for (var key in errorMessage) {
            if (errorMessage.hasOwnProperty(key)) {
                listOfErrors.push(<p style={{ color: 'red' }} key={key}>{errorMessage[key]}</p>);
            }
        }
        if (listOfErrors.length == 0) {
            returnButton = <Button style={{ width: '90%' }} onClick={returnItems} type="primary">Return</Button>;
        } else {
            returnButton = "";
        }
        errorMessagesRows = <div>{listOfErrors}</div>;
    }
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    function onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    };
    const hasSelected = selectedRowKeys.length > 0;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    function returnItems() {
        console.log(data);
        console.log(selectedRowKeys);
        const selectedRows = data.filter(d => selectedRowKeys.includes(d.key));
        const body = {
            billId: null,
            billType: "PHARMACY",
            createdAt: new Date(),
            paymentStatus: "paid",
            paymentMode: "Cash",
            patientId: props.patientDetails.patientId,
            name: props.patientDetails.patientName,
            age: props.patientDetails.age,
            gender: props.patientDetails.gender,
            // totalCost: finalCharges.totalAmount,
            // totalDiscount: finalCharges.totalDiscount,x
            // totalGST: finalCharges.totalGST,
            billDetailList: []
        };
        selectedRows.forEach(item => {
            const billItem = {
                id: null,
                itemName: item.name,
                itemId: item.itemId,
                billMapId: null,
                cost: item.total,
                concessionPercentage: item.discount,
                gstPercentage: item.gst,
                mrp: item.amount,
                concessionType: "discount",
                quantity: item.quantity,
                purchaseType: (item.type == "medicine" ? "pharmacy-return" : item.type)
            };
            body.billDetailList.push(billItem);
        });
        saveGenerateBill(body).then(response => {
            notification["success"]({
                message: 'SUCCESS',
                description: 'Return Bill Generated Successfully with id ' + response.billId,
                duration: 3
            });
            setBillGeneratedStatus(true);
            updateMainBill();
        }).catch(err => {
            notification["error"]({
                message: 'Error',
                description: 'Error while returning bill',
                duration: 3
            });
        })
    }

    return (
        <>
            <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
            {errorMessagesRows}
            <Table rowSelection={rowSelection} columns={columns} components={components} dataSource={data} onChange={onChange} rowClassName={() => 'editable-row'} />
            <br /><br /><br />
            <Row gutter={24}>
                <Col className="gutter-row" span={8}>
                    {returnButton}

                </Col>
                <Col className="gutter-row" span={8}>
                    {printButton}

                </Col>
                <Col className="gutter-row" span={8}>
                    {backToMainButton}

                </Col>
            </Row>
        </>
    );
};
export default ReturnItem;