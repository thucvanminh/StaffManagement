import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
    Upload,
} from 'antd';

const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const SettingForm: React.FC = () => {
    const [componentDisabled] = useState(false);
    const [form] = Form.useForm();

    const handleCancel = () => {
        form.resetFields(); // Reset toàn bộ form
    };

    return (
        <>
            <Form
                form={form}
                layout="horizontal"
                disabled={componentDisabled}
                style={{
                    maxWidth: 800, // Tăng chiều rộng form
                    margin: '0 auto', // Căn giữa form
                }}
            >
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="Name"
                            style={{ marginBottom: 16 }}
                        >
                            <Input placeholder="Name" style={{ textAlign: 'left' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="Gender"
                            style={{ marginBottom: 16 }}
                        >
                            <Select placeholder="Gender" style={{ textAlign: 'left' }}>
                                <Select.Option value="male">Male</Select.Option>
                                <Select.Option value="female">Female</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="Phone"
                            style={{ marginBottom: 16 }}
                        >
                            <Input placeholder="Phone number" style={{ textAlign: 'left' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="DOB"
                            style={{ marginBottom: 16 }}
                        >
                            <DatePicker style={{ width: '100%', textAlign: 'left' }} format="DD/MM/YYYY" placeholder="Date of birth" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item
                            name="Email"
                            style={{ marginBottom: 16 }}
                        >
                            <Input placeholder="Email" style={{ textAlign: 'left' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name="Address"
                    style={{ marginBottom: 16 }}
                >
                    <TextArea rows={3} placeholder="Address" style={{ textAlign: 'left' }} />
                </Form.Item>
                <Form.Item
                    name="CV"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    style={{ marginBottom: 16 }}
                >
                    <Upload action="/upload.do" listType="picture-card">
                        <button
                            style={{
                                color: 'inherit',
                                cursor: 'inherit',
                                border: 0,
                                background: 'none',
                            }}
                            type="button"
                        >
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload CV
                            </div>
                        </button>
                    </Upload>
                </Form.Item>
                <Form.Item className="Button" style={{ textAlign: 'center' }}>
                    <Button type="primary" style={{ marginRight: 8 }}>
                        Send
                    </Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default SettingForm;