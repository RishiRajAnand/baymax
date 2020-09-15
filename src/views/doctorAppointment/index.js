import React, { useState } from 'react';
import { Table, Tag, DatePicker,Button, TimePicker, Select, Space } from 'antd';

const { Option } = Select;

function PickerWithType({ type, onChange }) {
  if (type === 'time') return <TimePicker onChange={onChange} />;
  if (type === 'date') return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
}

function DoctorAppointment() {
  const [type, setType] = useState('time');
  const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Time Slot',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: tags => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Button type="primary">
                    Proceed
                </Button>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        time: "11:30 AM - 11:45 AM",
        status: ['Done', 'Postponed'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        time: "11:30 AM - 11:45 AM",
        status: ['Emergency'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        time: "11:30 AM - 11:45 AM",
        status: ['Done', 'Admitted'],
    },
];

  return (
      <>
    <Space>
      <Select value={type} onChange={setType}>
        <Option value="time">Time</Option>
        <Option value="date">Date</Option>
        <Option value="week">Week</Option>
        <Option value="month">Month</Option>
        <Option value="quarter">Quarter</Option>
        <Option value="year">Year</Option>
      </Select>
      <PickerWithType type={type} onChange={value => console.log(value)} />
    </Space>
    <Table columns={columns} dataSource={data} />
    </>
  );
}

export default DoctorAppointment;