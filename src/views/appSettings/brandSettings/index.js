import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Form, Input, Upload, Button, Radio, InputNumber, notification } from 'antd';
import { getBrandDetails, saveBrandDetails } from '../../../state/registration/queries';
import { UploadOutlined } from '@ant-design/icons';
const BrandSettings = (props) => {
    const [form] = Form.useForm();
    const [branddetails, setBrandDetails] = useState({});
    const [logo, setLogo] = useState("");
    useEffect(() => {
        getBrandDetail();
    }, []);

    function getBrandDetail() {
        getBrandDetails().then(data => {
            if (data && Array.isArray(data) && data.length > 0) {
                form.setFieldsValue({
                    companyname: data[0].companyName,
                    companyaddress: data[0].companyAddress,
                    gstin: data[0].gstin,
                    regNo: data[0].regNo,
                    contactNo: data[0].contact,
                });
                if (data[0].logo) {
                    setLogo(data[0].logo);
                }
                setBrandDetails(data[0]);
            }
        }).catch(err => {

        })
    }
    async function onFinish(values) {
        console.log('Success:', values);
        const image = await toBase64(values.logo.file.originFileObj);
        const body = {
            id: branddetails.id,
            companyName: values.companyname,
            companyAddress: values.companyaddress,
            email: values.email,
            gstin: values.gstin,
            regNo: values.regNo,
            email: values.email,
            website: values.website,
            contact: values.contactNo,
            logo: image
        };
        console.log("bhugat", await toBase64(values.logo.file.originFileObj));
        saveBrandDetails(body).then(data => {
            notification["success"]({
                message: 'SUCCESS',
                description: `Brand details changed successfully`,
                duration: 3
            });
        }).catch(err => {
            notification["error"]({
                message: 'ERROR',
                description: `Error while saving Item`,
                duration: 3
            });
        });
    };
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    return (
        <>
            <Form
                layout='vertical'
                onFinish={onFinish}
                form={form}
            >
                <div style={{ width: '30%' }}>
                    <img src={logo} style={{ width: '100%' }} />
                </div>

                <Form.Item name="logo" label="Logo">
                    <Upload name="logo" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item name="companyname" label="Company's name">
                    <Input placeholder="Company's name to be printed in bills / receipts and certificates" />
                </Form.Item>
                <Form.Item name="companyaddress" label="Company's address">
                    <Input placeholder="Company's address" />
                </Form.Item>
                <Form.Item name="email" label="Company's email">
                    <Input placeholder="Company's email" />
                </Form.Item>
                <Form.Item name="website" label="Company's website">
                    <Input placeholder="Company's website" />
                </Form.Item>
                <Form.Item name="gstin" label="Company's GSTIN">
                    <Input placeholder="Company's GSTIN" />
                </Form.Item>
                <Form.Item name="regNo" label="Company's Reg. No">
                    <Input placeholder="Company's Reg. No" />
                </Form.Item>
                <Form.Item name="contactNo" label="Contact Number">
                    <InputNumber style={{ width: '100%' }} placeholder="Contact Number" />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">Submit</Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default BrandSettings;