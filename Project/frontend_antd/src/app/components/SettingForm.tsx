import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    DatePicker,
    Form,
    Input,
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
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                disabled={componentDisabled}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item label="Name" name="Name">
                    <Input />
                </Form.Item>
                <Form.Item label="DOB" name="DOB">
                    <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY"/>
                </Form.Item>
                <Form.Item label="Gender" name="Gender">
                    <Select>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Address" name="Address">
                    <TextArea rows={2} />
                </Form.Item>
                <Form.Item label="Phone" name="Phone">
                    <Input />
                </Form.Item>
                <Form.Item label="Avatar" name="Avatar" valuePropName="fileList" getValueFromEvent={normFile}>
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
                                Upload
                            </div>
                        </button>
                    </Upload>
                </Form.Item>
                <Form.Item className="Button">
                    <Button type="primary">Send</Button>
                    <Button style={{ margin: '0 8px' }} onClick={handleCancel}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default SettingForm;