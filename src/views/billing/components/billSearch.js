import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Radio, Divider, Descriptions, Select, Badge, Table, Row, Col } from 'antd';
const { Option } = Select;

const BillSearch = (props) => {
    const defaultSearch = "patientId";
    const [filterValue, setfilterValue] = useState(defaultSearch);

    function onSearch(value) {
        props.onSearch(value, filterValue);
    }
    return (
        <Row>
            <Col span={6}>
                <Input.Group compact>
                    <Select defaultValue={defaultSearch} onSelect={setfilterValue}>
                        <Option value="patientId">Patient Id</Option>
                        <Option value="billId">Bill Id</Option>
                        <Option value="receiptId">Receipt Id</Option>
                    </Select>
                    <Input.Search onSearch={onSearch} style={{ width: '70%' }} placeholder="Search by" />
                </Input.Group>
            </Col>
            <Col span={6}>
            </Col>
        </Row>);
};
export default BillSearch;
