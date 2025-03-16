import React, { useState } from 'react';
import '@ant-design/v5-patch-for-react-19';
import type { TableColumnsType } from 'antd';
import { Input, Table, Drawer, Row, Col, Form, Space, Button, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './BusinessTripTable.css';

interface DataType {
    key: number;
    name: string;
    position: string;
    department: string;
    time: string;
    destination: string;
    status: string;
}

const originalData: DataType[] = Array.from({ length: 10 }).map((_, i) => ({
    key: i,
    name: 'John Brown',
    position: 'Developer',
    department: 'Department A',
    time: '10/8/2025 12:00:00 - 15/8/2025 18:00:00',
    destination: 'TP.HCM, Quận 5',
    status: 'Pending / In Progress / Finished',
}));

const App: React.FC = () => {
    const [dataSource, setDataSource] = useState(originalData);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        form.resetFields();
        setOpen(false);
    };

    const onSubmit = () => {
        form.validateFields()
            .then((values) => {
                const newEmployee: DataType = {
                    key: dataSource.length,
                    name: values.name,
                    position: values.position,
                    department: values.department,
                    time: `${values.dateTime[0].format('DD/MM/YYYY HH:mm:ss')} - ${values.dateTime[1].format('DD/MM/YYYY HH:mm:ss')}`,
                    destination: values.destination,
                    status: 'Pending', // Giá trị mặc định khi thêm mới
                };
                setDataSource([...dataSource, newEmployee]);
                onClose();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleSearch = (value: string) => {
        const filteredData = originalData.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setDataSource(filteredData);
    };

    const columns: TableColumnsType<DataType> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
            filters: [
                { text: 'Developer', value: 'Developer' },
                { text: 'Intern', value: 'Intern' },
                { text: 'Freshman', value: 'Freshman' },
                { text: 'Accountant', value: 'Accountant' },
            ],
            onFilter: (value, record) => record.position.indexOf(value as string) === 0,
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            filters: [
                { text: 'Department A', value: 'Department A' },
                { text: 'Department B', value: 'Department B' },
                { text: 'Department C', value: 'Department C' },
                { text: 'Department D', value: 'Department D' },
            ],
            onFilter: (value, record) => record.department.indexOf(value as string) === 0,
        },
        { title: 'Time', dataIndex: 'time', key: 'time' },
        { title: 'Destination', dataIndex: 'destination', key: 'destination' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <a>Update</a>
                    <a>Remove</a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Input.Search
                placeholder="Search by Name"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
                style={{ width: 500, marginBottom: 16 }}
            />
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showDrawer}
                size="large"
                style={{ marginLeft: 6, marginBottom: 16 }}
            >
                New Employee
            </Button>
            <Table<DataType>
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 10 }}
            />
            <Drawer
                title=""
                width={720}
                placement="left"
                onClose={onClose}
                open={open}
                styles={{ body: { paddingBottom: 80 } }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onSubmit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter employee name' }]}
                            >
                                <Input placeholder="Please enter employee name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="position"
                                label="Position"
                                rules={[{ required: true, message: 'Please select position' }]}
                            >
                                <Select placeholder="Please select position">
                                    <Select.Option value="Developer">Developer</Select.Option>
                                    <Select.Option value="Intern">Intern</Select.Option>
                                    <Select.Option value="Freshman">Freshman</Select.Option>
                                    <Select.Option value="Accountant">Accountant</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="department"
                                label="Department"
                                rules={[{ required: true, message: 'Please select department' }]}
                            >
                                <Select placeholder="Please select department">
                                    <Select.Option value="Department A">Department A</Select.Option>
                                    <Select.Option value="Department B">Department B</Select.Option>
                                    <Select.Option value="Department C">Department C</Select.Option>
                                    <Select.Option value="Department D">Department D</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="dateTime"
                                label="Time"
                                rules={[{ required: true, message: 'Please choose the time range' }]}
                            >
                                <DatePicker.RangePicker
                                    showTime
                                    style={{ width: '100%' }}
                                    getPopupContainer={(trigger) => trigger.parentElement!}
                                    format="DD/MM/YYYY HH:mm"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="destination"
                                label="Destination"
                                rules={[{ required: true, message: 'Please enter destination' }]}
                            >
                                <Input placeholder="Please enter destination" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default App;