// frontend_antd/src/app/hr/overtime/OvertimeTable.tsx
import React, { useState, useEffect } from 'react';
import { Input, Table, Drawer, Row, Col, Form, Space, Button, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import OvertimeService from '../../services/overtimeService';
import './OvertimeTable.css';
import moment from 'moment';

const roleMap = {
  1: 'Director',
  2: 'HR',
  3: 'Employee',
};

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
    filters: [
      { text: 'Director', value: 'Director' },
      { text: 'HR', value: 'HR' },
      { text: 'Employee', value: 'Employee' },
    ],
    onFilter: (value, record) => record.position === value,
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
  },
  { title: 'Time', dataIndex: 'time', key: 'time' },
  { title: 'Description', dataIndex: 'description', key: 'description' },
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

const App = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchOvertimeRequests();
  }, []);

  const fetchOvertimeRequests = async (searchValue = '') => {
    setLoading(true);
    try {
      const response = await OvertimeService.getAllOvertimeRequests();
      const flattenedData = response.flatMap((request) =>
        request.employees.map((employee) => ({
          key: `${request.overtimeRequestID}-${employee.employeeID}`,
          name: employee.fullName,
          email: employee.email,
          position: roleMap[employee.roleID] || 'Unknown', // Ánh xạ roleID
          department: employee.departmentName, // Sử dụng departmentName
          time: moment(request.date).format('DD/MM/YYYY HH:mm'),
          description: request.reason,
        }))
      );
      const filteredData = flattenedData.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setDataSource(filteredData);
    } catch (error) {
      console.error('Failed to fetch overtime requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    fetchOvertimeRequests(value);
  };

  const showDrawer = () => setOpen(true);
  const onClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      const newRequest = {
        date: values.dateTime.format('YYYY-MM-DD HH:mm:ss'),
        hours: parseFloat(values.hours),
        reason: values.reason,
        employeeIDs: values.employeeIDs.map(Number),
      };
      await OvertimeService.createOvertimeRequest(newRequest);
      fetchOvertimeRequests();
      onClose();
    } catch (error) {
      console.error('Failed to create overtime request:', error);
    }
  };

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
        New Overtime Request
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      <Drawer
        title="New Overtime Request"
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
                name="employeeIDs"
                label="Employee IDs"
                rules={[{ required: true, message: 'Please enter employee IDs' }]}
              >
                <Select mode="multiple" placeholder="Select employees">
                  <Select.Option value="135">Hoàng Văn Em (135)</Select.Option>
                  <Select.Option value="136">Vũ Thị Phụng (136)</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="Date and Time"
                rules={[{ required: true, message: 'Please choose the date and time' }]}
              >
                <DatePicker showTime format="DD/MM/YYYY HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="hours"
                label="Hours"
                rules={[{ required: true, message: 'Please enter hours' }]}
              >
                <Input type="number" placeholder="Enter hours" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="reason"
                label="Reason"
                rules={[{ required: true, message: 'Please enter reason' }]}
              >
                <Input placeholder="Enter reason" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default App;