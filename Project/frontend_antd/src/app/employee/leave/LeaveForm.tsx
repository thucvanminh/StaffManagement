import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import {
    Button,
    Form,
    Input,
    Select,
    DatePicker,
} from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const App: React.FC = () => {
    const [componentDisabled] = useState(false);
    const [form] = Form.useForm();

    const handleCancel = () => {
        form.resetFields(['Name', 'Department', 'Reason', 'Note']);
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
                initialValues={{
                    dateCreated: dayjs(),
                }}
            >
                <Form.Item
                    label="Name"
                    name="Name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Department"
                    name="Department"
                    rules={[{ required: true, message: 'Please select your department!' }]}
                >
                    <Select>
                        <Select.Option value="department_a">Department A</Select.Option>
                        <Select.Option value="department_b">Department B</Select.Option>
                        <Select.Option value="department_c">Department C</Select.Option>
                        <Select.Option value="department_d">Department D</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Reason"
                    name="Reason"
                    rules={[{ required: true, message: 'Please input your reason!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Date Created" name="dateCreated">
                    <DatePicker
                        disabled
                        style={{ width: '100%' }}
                        format="DD/MM/YYYY"
                    />
                </Form.Item>
                <Form.Item
                    label="Note"
                    name="Note"
                >
                    <TextArea rows={5} />
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
export default App;