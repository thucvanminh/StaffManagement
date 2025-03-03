import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Rate,
    Select,
    Space,
    Upload,
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const SettingForm: React.FC = () => {
    const [componentDisabled] = useState(false);
    return (
        <>

            <Form
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


                <Form.Item label="Name">
                    <Input />
                </Form.Item>
                <Form.Item label="DOB">
                    <DatePicker style ={{ width: '100%' }}/>
                </Form.Item>
                <Form.Item label="Gender">
                    <Select>
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>

                    </Select>
                </Form.Item>
                <Form.Item label="Address">
                    <TextArea rows={2} />
                </Form.Item>
                <Form.Item label="Phone">
                    <Input />
                </Form.Item>
                <Form.Item label="Avatar" valuePropName="fileList" getValueFromEvent={normFile}>
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
                    <Button type="primary">Save</Button>
                    <Button>Cancel</Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default SettingForm;