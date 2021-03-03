import React, { useState } from 'react';
import moment from 'moment';
import { Input, Select, DatePicker } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
const BillSearchComp = (props) => {
    const defaultSearch = "billId";
    const [filterValue, setfilterValue] = useState(defaultSearch);
    let inputSearch = <Input.Search onSearch={onSearch} style={{ width: '70%' }} placeholder="Search Bill by" />;

    if (filterValue == "dateRange") {
        inputSearch = <RangePicker onChange={onDateRangeSelect} disabledDate={disabledDate} />;
    }
    
    function onDateRangeSelect(values) {
        var actualDates = convertToActualDate(values);
        props.onSearch(actualDates, filterValue);
    }

    function convertToActualDate(values) {
        var date = moment(values[0]).toDate();
        date.setHours(0);

        var date2 = moment(values[1]).toDate();
        date2.setHours(24);
        return [date.getTime(), date2.getTime()];
    }
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    }
    function onSearch(value) {
        props.onSearch(value, filterValue);
    }
    return (
        <Input.Group compact>
            <Select defaultValue={defaultSearch} onSelect={setfilterValue}>
                {/* <Option key="patientId" value="patientId">Patient Id</Option> */}
                <Option key="billId" value="billId">Bill Id</Option>
                <Option key="dateRange" value="dateRange">Date Range</Option>
            </Select>
            { inputSearch }
        </Input.Group>);
};
export default BillSearchComp;
