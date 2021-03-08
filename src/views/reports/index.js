import React, { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col, Button, Select } from 'antd';
import { Bar } from '@ant-design/charts';
import { Pie } from '@ant-design/charts';
import { RingProgress } from '@ant-design/charts';
import { Line } from '@ant-design/charts';
const { Option } = Select;
const Reports = () => {
    const [linedata, setLineData] = useState([]);
    useEffect(() => {
        asyncFetch();
    }, []);
    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
            .then((response) => response.json())
            .then((json) => setLineData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    var lineConfig = {
        data: linedata,
        padding: 'auto',
        xField: 'Date',
        yField: 'scales',
        xAxis: { tickCount: 5 },
        slider: {
            start: 0.1,
            end: 0.5,
        },
    };
    var bardata = [
        {
            year: 'Jan',
            value: 38,
        },
        {
            year: 'feb',
            value: 52,
        },
        {
            year: 'mar',
            value: 61,
        },
        {
            year: 'Apr',
            value: 145,
        },
        {
            year: 'May',
            value: 48,
        },
    ];
    var barconfig = {
        data: bardata,
        xField: 'value',
        yField: 'year',
        seriesField: 'year',
        legend: { position: 'top-left' },
    };
    var data = [
        {
            type: 'india',
            value: 27,
        },
        {
            type: 'pak',
            value: 25,
        },
        {
            type: 'Aus',
            value: 18,
        },
        {
            type: 'Eng',
            value: 15,
        },
        {
            type: 'ban',
            value: 10,
        },
        {
            type: 'Sri',
            value: 5,
        },
    ];
    var config = {
        appendPadding: 10,
        data: data,
        angleField: 'value',
        width: 10,
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: function content(_ref) {
                var percent = _ref.percent;
                return ''.concat(percent * 100, '%');
            },
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [{ type: 'element-active' }],
    };
    var ringconfig = {
        height: 100,
        width: 100,
        autoFit: false,
        percent: 0.7,
        color: ['#5B8FF9', '#E8EDF3'],
    };
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    var dateFilters = <Select defaultValue="Today" style={{ width: 120 }} onChange={handleChange}>
        <Option value="Today">Today</Option>
        <Option value="week">This week</Option>
        <Option value="month">This month</Option>
        <Option value="Quarter">This Quarter</Option>
    </Select>;
    return (
        <>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="Purchases" extra={dateFilters}>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Statistic title="Total Item ordered" value={112893} />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Cost" value={112893} precision={2} />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Item Returned" value={112893} precision={2} />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="Cost" value={112893} precision={2} />
                                </Col>
                            </Row>
                        </Card>
                        <Card title="InStock Item" >
                            <RingProgress {...ringconfig} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Item Sold by category" extra={<a href="#">More</a>}>
                            <Pie {...config} />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Sale by months" extra={<a href="#">expand</a>}>
                            <Bar {...barconfig} />
                        </Card>
                    </Col>
                </Row>
                <h5>Revenue by month</h5>
                <Line {...lineConfig} />
            </div>
        </>
    );
};

export default Reports;
