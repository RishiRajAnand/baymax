import React, { useEffect } from 'react';
import BillSearch from '../billing/components/billSearch';
import { Link } from "react-router-dom";
import { Form, Input, AutoComplete, Badge, Descriptions, Row, Col, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UserOutlined, DownloadOutlined, OrderedListOutlined } from '@ant-design/icons';
const renderTitle = (title: string) => {
    return (
        <span>
            {title}
            <a
                style={{ float: 'right' }}
                href="https://www.google.com/search?q=antd"
                target="_blank"
                rel="noopener noreferrer"
            >
                more
        </a>
        </span>
    );
};

const renderItem = (title: string, count: number) => {
    return {
        value: title,
        label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {title}
                <span>
                    <UserOutlined /> {count}
                </span>
            </div>
        ),
    };
};

const options = [
    {
        label: renderTitle('Libraries'),
        options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
    },
    {
        label: renderTitle('Solutions'),
        options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
    },
    {
        label: renderTitle('Articles'),
        options: [renderItem('AntDesign design language', 100000)],
    },
];

const Canteen = () => {
    const onFinish = values => {
        console.log('Received values of form:', values);
    };

    return (
        <>
            <Row>
                <Col span={6}>
                    <BillSearch />
                </Col>
                <Col span={6}>
                    <Button type="dashed" icon={<PlusOutlined />}>
                        New
                    </Button>
                    <Button type="dashed" style={{ marginLeft: '5px' }} icon={<OrderedListOutlined />}>
                        <Link to="/home/canteenStock">View Stock</Link>
                    </Button>
                </Col>
            </Row>
            <br /><br />
            <Descriptions title="Patient Info">
                <Descriptions.Item label="Patient Name">Rishiraj</Descriptions.Item>
                <Descriptions.Item label="Phone">919829128</Descriptions.Item>
                <Descriptions.Item label="Department">Ward 1</Descriptions.Item>
                <Descriptions.Item label="Status" span={3}>
                    <Badge status="warning" text="pending" />
                </Descriptions.Item>
            </Descriptions>
            <br /><br />
            <br /><br />
            <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                <Form.List name="users">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map(field => (
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'itemName']}
                                            fieldKey={[field.fieldKey, 'itemName']}
                                            rules={[{ required: true, message: 'Missing Item name' }]}
                                        >
                                            <AutoComplete
                                                dropdownClassName="certain-category-search-dropdown"
                                                dropdownMatchSelectWidth={500}
                                                style={{ width: 250 }}
                                                options={options}
                                            >
                                                <Input.Search placeholder="Search item" />
                                            </AutoComplete>
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'price']}
                                            fieldKey={[field.fieldKey, 'price']}
                                        >
                                            <Input placeholder="Price" />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'gst']}
                                            fieldKey={[field.fieldKey, 'gst']}
                                        >
                                            <Input placeholder="gst" />
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
                                        <PlusOutlined /> Add Items
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>
                {/* <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item> */}
            </Form>
            <Descriptions title="">
                <Descriptions.Item label="Total Amount">100</Descriptions.Item>
                <Descriptions.Item label="Total GST">15</Descriptions.Item>
                <Descriptions.Item label="Total discount">0</Descriptions.Item>
            </Descriptions>
            <br /><br />
            <Form.Item>
                <Row>
                    <Col span={12} offset={11}>
                        <Button type="primary" shape="round" icon={<DownloadOutlined />} size='large'>Print</Button>
                        <Button style={{ marginLeft: '10px' }} type="primary" shape="round" size='large'>Pay Now</Button>
                        <Button style={{ marginLeft: '10px' }} type="primary" shape="round" size='large'>Add to Bill</Button>
                    </Col>
                </Row>

            </Form.Item>
        </>

    );
};
export default Canteen;
