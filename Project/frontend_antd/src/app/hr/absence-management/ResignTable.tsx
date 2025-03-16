import React, { useState } from 'react';
import type { TableColumnsType } from 'antd';
import { Input, Table, Space } from 'antd';
import './Table.css';

interface DataType {
  key: number;
  name: string;
  email: string;
  position: string;
  department: string;
  date: string;
  resignType: string;
}

const originalData: DataType[] = Array.from({ length: 10 }).map((_, i) => ({
  key: i,
  name: 'John Brown',
  email: 'abc@gmail.com',
  position: 'Developer',
  department: 'Department A',
  date: '12/12/2025',
  resignType: 'Personal Reason',
}));

const columns: TableColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
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
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Reason', dataIndex: 'resignType', key: 'resignType' },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>Approve</a>
        <a>Deny</a>
      </Space>
    ),
  },
];

const App: React.FC = () => {
  const [dataSource, setDataSource] = useState(originalData);

  const handleSearch = (value: string) => {
    const filteredData = originalData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.email.toLowerCase().includes(value.toLowerCase())
    );
    setDataSource(filteredData);
  };

  return (
    <>
      <Input.Search
        placeholder="Search by Name or Email"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
        style={{ width: 500, marginBottom: 16 }}
      />
      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default App;