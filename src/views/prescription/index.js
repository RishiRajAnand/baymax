import { PrinterOutlined, MinusCircleOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Col, DatePicker, Divider, Form, Input, InputNumber, notification, Row, Select, Space } from 'antd';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import useMedicineSearch from '../../state/addMedicine/hooks/useSearchMedicine';
import useSearchTest from '../../state/addMedicine/hooks/useSearchTest';
import { getPatientById } from '../../state/patientSearch/queries';
import useSavePrescription from '../../state/prescription/hooks/useSavePrescription';
import PatientDetails from '../patientDetails';
import '../prescription/prescription.css';

const { Option } = Select;

const renderTitle = (title) => {
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

const renderItem = (title, count) => {
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



const Prescription = ({ location, history }) => {
    let options = [];
    const optionsTests = [];
    const [submitted, setSubmitted] = useState(false);
    const [patientDetails, setPatientDetails] = useState({});
    const [form] = Form.useForm();
    const [medicineForm] = Form.useForm();
    const [vitalsForm] = Form.useForm();
    const [adviceForm] = Form.useForm();

    const [medicines, isLoadings, setMedicineSearch] = useMedicineSearch();
    const [response, isLoading1, setSavePrescription] = useSavePrescription();
    const [tests, isLoading, setTestSearch] = useSearchTest();
    // const [tests, isLoading, setTestSearch] = usePre();
    const queryParams = queryString.parse(location.search);
    useEffect(() => {
        getPatientDetails(queryParams.patientId);
        if (response.status == "SUCCESS") {
            notification["success"]({
                message: 'SUCCESS',
                description: 'The patient prescription has been generated successfully',
                duration: 3
            });
        } else if (response.status == 500) {
            notification["error"]({
                message: 'Error',
                description: 'There was some error saving the prescription, please check with admin',
                duration: 3
            });
        }
    }, [response]);
    function getPatientDetails(patientId) {
        getPatientById(patientId).then(data => {
            setPatientDetails(data);
        });
    }
    const onFinish = values => {
        console.log('Received values of form:', values);
        console.log('Dawaiyaan', form.getFieldsValue());
        console.log('tests:', medicineForm.getFieldsValue());
        console.log('vitals:', vitalsForm.getFieldsValue());
        const medicineList = medicineForm.getFieldsValue().users;
        const testList = form.getFieldsValue().users;
        const patientVitals = vitalsForm.getFieldsValue();
        const body = {
            appointmentDto: {
                appointmentId: queryParams.appointmentId,
                appointmentDate: new Date().getTime(),
                patientId: queryParams.patientId,
                patientName: queryParams.patientName,
                doctorId: queryParams.doctorId,
                height: patientVitals.height,
                weight: patientVitals.weight,
                Bp: patientVitals.bp,
                temprature: patientVitals.temparature,
                advise: adviceForm.getFieldsValue().advice,
                status: "done"
            },
            prescribedMedsDtoList: null,
            prescribedTestingDtoList: null
        };

        if (medicineList != null && medicineList.length > 0) {
            body.prescribedMedsDtoList = medicineList.map(medicine => {
                return { medName: medicine.medicineName, days: medicine.numberOfDays, dosage: medicine.dosage, comment: medicine.comments };
            });
        }

        if (testList != null && testList.length > 0) {
            body.prescribedTestingDtoList = testList.map(test => {
                return {
                    testName: test.testName,
                    dateOfBooking: test.date,
                    comment: test.comments
                };
            });
        }
        setSavePrescription(body);
        setSubmitted(true);
    };
    const handleSearch = (value) => {
        setMedicineSearch();
    };

    const handleTestSearch = (value) => {
        setTestSearch();
    };

    if (tests.length > 0) {
        tests.forEach(test => {
            optionsTests.push({ value: test.testName });
        });
    }

    if (medicines.length > 0) {
        var map = new Map();

        medicines.forEach(medicine => {
            if (map.has(medicine.medicineType)) {
                map.set(medicine.medicineType, [...map.get(medicine.medicineType), medicine.medicineName]);
            } else {
                map.set(medicine.medicineType, [medicine.medicineName])
            }
        });
        console.log(map);
        for (let [key, value] of map) {
            console.log(key + " = " + value);
            options.push({
                label: renderTitle(key),
                options: value.map(val => renderItem(val, 100)),
            });
        }
    }
    let formActions = <Button size="large" type="primary">Submit</Button>;
    if (submitted && response.status != 500) {
        formActions = (<><Button type="primary" shape="round" onClick={() => {
            history.push({ pathname: '/home/viewPrescription', search: '?patientId=' + queryParams.patientId + '&doctorId=' + queryParams.doctorId + '&appointmentId=' + queryParams.appointmentId });
        }} icon={<PrinterOutlined />} size='large'>Print</Button>
            <Button style={{ marginLeft: '10px' }} type="primary" shape="round" size='large' onClick={value => history.push({ pathname: '/home/doctorAppointment' })}>Go to My Appoinments</Button></>);
    }
    return (
        <>
            <PatientDetails patientDetails={patientDetails} />
            <br></br>
            <Divider>Patient Vitals</Divider>

            <Form
                form={vitalsForm}
            >
                <Row gutter={24}>
                    <Col span={6}>
                        <Form.Item label="BP" name="bp">
                            <InputNumber name="bp" style={{ width: '90%' }} placeholder="Blood pressure" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Temparature" name="temparature">
                            <InputNumber name="temparature" style={{ width: '90%' }} placeholder="Temp In degrees Celsius" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Height" name="height">
                            <InputNumber name="height" style={{ width: '90%' }} placeholder="Height in feet" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Weight" name="weight">
                            <Input name="weight" style={{ width: '90%' }} placeholder="Weight in (kgs)" />
                        </Form.Item>
                    </Col>
                </Row>


            </Form>
            <Divider>Prescribe Medicines</Divider>
            {/* <PrescribeMedicine /> */}

            <Form name="dynamic_form_nest_item" form={medicineForm} onFinish={onFinish} autoComplete="off">
                <Form.List name="users">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map((field, index) => (
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'medicineName']}
                                            fieldKey={[field.fieldKey, 'medicineName']}
                                            rules={[{ required: true, message: 'Missing Medicine name' }]}
                                        >
                                            <AutoComplete
                                                onSearch={handleSearch}
                                                dropdownClassName="certain-category-search-dropdown"
                                                dropdownMatchSelectWidth={500}
                                                style={{ width: 250 }}
                                                options={options}
                                            >
                                                <Input.Search size="default" placeholder="Medicine" />
                                            </AutoComplete>
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'dosage']}
                                            fieldKey={[field.fieldKey, 'dosage']}
                                            rules={[{ required: true, message: 'Missing Dosage' }]}
                                        >
                                            <Select
                                                placeholder="Dosage per day (M-A-N)"
                                                allowClear>
                                                <Option value="1-0-0">1-0-0</Option>
                                                <Option value="1-1-0">1-1-0</Option>
                                                <Option value="1-1-1">1-1-1</Option>
                                                <Option value="0-0-1">0-0-1</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'numberOfDays']}
                                            fieldKey={[field.fieldKey, 'numberOfDays']}
                                            rules={[{ required: true, message: 'Missing Number of days' }]}
                                        >
                                            <InputNumber />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'comments']}
                                            fieldKey={[field.fieldKey, 'comments']}
                                        >
                                            <Input placeholder="Comments" />
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
                                        <PlusOutlined /> Add Medicines
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

            <br></br>
            <Divider>Prescribe Tests</Divider>
            <Form name="dynamic_form_nest_item2" form={form} autoComplete="off">
                <Form.List name="users">
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map(field => (
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'testName']}
                                            fieldKey={[field.fieldKey, 'testName']}
                                            rules={[{ required: true, message: 'Missing test name' }]}
                                        >
                                            <AutoComplete
                                                onSearch={handleTestSearch}
                                                style={{ width: 200 }}
                                                options={optionsTests}
                                                placeholder="Type test name"
                                                filterOption={(inputValue, option) =>
                                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                }
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'date']}
                                            fieldKey={[field.fieldKey, 'date']}
                                            rules={[{ required: false }]}
                                        >
                                            <DatePicker />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, 'comments']}
                                            fieldKey={[field.fieldKey, 'comments']}
                                        >
                                            <Input placeholder="Comments" />
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
                                        <PlusOutlined /> Add Tests
                                   </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>

            </Form>

            <Form
                form={adviceForm}
            >
                <Row gutter={24}>
                    <Col span={20}>
                        <Form.Item name='advice' label="Summary">
                            <Input.TextArea />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Row>
                <Col span={12} onClick={onFinish} offset={11}>
                    {formActions}
                </Col>
            </Row>
        </>);
};

export default Prescription;
