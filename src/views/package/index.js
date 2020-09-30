import { Button, Col, Form, Row, Space, Table, Tag } from 'antd';
import React from 'react';
import { Link } from "react-router-dom";
const columns = [
    {
        title: 'Package Name',
        dataIndex: 'packageName',
        key: 'packageName',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Package End Date',
        dataIndex: 'packageEndDate',
        key: 'packageEndDate',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: tags => (
            <>
                {tags.map(tag => {
                    return (
                        <Tag color="green" key={tag}>
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
                <a>view</a>
                <a>edit</a>
            </Space>
        ),
    },
];

const data = [
    {
        key: '1',
        packageName: 'value',
        packageEndDate: 'value',
        price: 'value',
        status: ['Active']
    },
    {
        key: '2',
        packageName: 'value',
        packageEndDate: 'value',
        price: 'value',
        status: ['Active']
    },
    {
        key: '3',
        packageName: 'value',
        packageEndDate: 'value',
        price: 'value',
        status: ['Active']
    },
];

const Package = () => {
    return (
        <>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            <Link to="/home/newPackage">Create New</Link>
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default Package;
