import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select, notification } from 'antd';
import { OrderedListOutlined } from '@ant-design/icons';
import '../addDoctor/addDoctor.css';
import { departments, doctorsSpeciality, qualifications } from '../../../utils/departmentList';
import useDoctorRegistration from '../../../state/registration/hooks/useDoctorRegistration';
import { doctorsRegistration, getDoctorDetailById } from '../../../state/registration/queries';
import queryString from 'query-string';

const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 9 },
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

const PhonePrefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select defaultValue="91" style={{ width: 70 }}>
            <Option value="91">+91</Option>
            <Option value="87">+87</Option>
        </Select>
    </Form.Item>
);

const department = departments.map(department => <Option key={department}>{department}</Option>);
const speciality = doctorsSpeciality.map(speciality => <Option key={speciality}>{speciality}</Option>);
const qualification = qualifications.map(qualification => <Option key={qualification}>{qualification}</Option>);


function handleChange(value) {
    console.log(`Selected: ${value}`);
}

const AddDoctor = ({ location, history }) => {
    const [form] = Form.useForm();
    const [status, isLoading, setRequest] = useDoctorRegistration();
    const queryParams = queryString.parse(location.search);
    useEffect(() => {
        if (queryParams.mode == "edit" && queryParams.doctorId != null) {
            getDoctorDetailById(queryParams.doctorId).then(data => {
                form.setFieldsValue({
                    user: {
                        name: data.doctorName,
                        department: data.department,
                        experience: data.experience,
                        speciality: data.speciality,
                        highestQualification: data.highestQualification,
                        designation: data.designation,
                        consulationCharge: data.consulationCharge,
                    }
                });
            });
        }
    }, []);

    const onFinish = formData => {
        const form = formData.user;
        const body = {
            "empId": "test123",
            "doctorName": form.name,
            "department": form.department,
            "experience": form.experience,
            "speciality": form.speciality,
            "highestQualification": form.highestQualification,
            "consulationCharge": form.consulationCharge,
            "designation": form.designation
        };
        if (queryParams.mode == "edit" && queryParams.doctorId != null) {
            body["doctorId"] = queryParams.doctorId;
        }
        doctorsRegistration(body).then(data => {
            notification["success"]({
                message: 'SUCCESS',
                description: `The Doctor has been ${(queryParams.mode == "edit" ? "Edited" : "registered" )} successfully`,
                duration: 3
            });
        }).catch(err => {
            notification["error"]({
                message: 'Error',
                description: 'Error while saving doctor details',
                duration: 3
            });
        });
    };


    return (
        <>
            <Button onClick={() => {
                history.push({ pathname: '/home/viewDoctors' });
            }} type="dashed" icon={<OrderedListOutlined />}>View doctors</Button>
            <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Department" name={['user', 'department']}>
                    <Select>
                        {department}
                    </Select>
                </Form.Item>
                <Form.Item name={['user', 'experience']} label="Experience" rules={[{ type: 'number', min: 0, max: 99 }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Specialization" name={['user', 'speciality']}>
                    <Select>
                        {speciality}
                    </Select>
                </Form.Item>
                <Form.Item label="Highest Qualification" name={['user', 'highestQualification']}>
                    <Select>
                        {qualification}
                    </Select>
                </Form.Item>
                <Form.Item name={['user', 'designation']} label="Designation">
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'consulationCharge']} label="Consultation Charges" rules={[{ type: 'number', min: 0, max: 10000 }]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddDoctor;
