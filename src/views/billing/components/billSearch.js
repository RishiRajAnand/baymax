import React, { useState } from 'react';
import { Input, Select } from 'antd';
const { Option } = Select;

const BillSearchComp = (props) => {
    const defaultSearch = "patientId";
    const [filterValue, setfilterValue] = useState(defaultSearch);

    function onSearch(value) {
        props.onSearch(value, filterValue);
    }
    return (
                <Input.Group compact>
                    <Select defaultValue={defaultSearch} onSelect={setfilterValue}>
                        <Option value="patientId">Patient Id</Option>
                        <Option value="billId">Bill Id</Option>
                        <Option value="receiptId">Receipt Id</Option>
                    </Select>
                    <Input.Search onSearch={onSearch} style={{ width: '70%' }} placeholder="Search Bill by" />
                </Input.Group>);
};
export default BillSearchComp;
