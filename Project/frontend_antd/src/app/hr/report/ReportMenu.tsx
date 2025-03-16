import React, { useState } from 'react';
import '@ant-design/v5-patch-for-react-19';
import type { TableColumnsType } from 'antd';
import { Input, Table, Drawer, Row, Col, Divider, Space, Button } from 'antd';
import './ReportMenu.css';

interface DataType {
    key: React.Key;
    name: string;
    email: string;
    position: string;
    department: string;
    date: string;
    showReport: string;
}

const originalDataSource = Array.from({ length: 50 }).map<DataType>((_, i) => ({
    key: i.toString(),
    date: '12/12/2025',
    name: 'John Brown',
    email: 'abc@gmail.com',
    position: 'Developer',
    department: 'Department A',
    showReport: 'Report',
}));

const App: React.FC = () => {
    const [dataSource, setDataSource] = useState(originalDataSource);
    const [open, setOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);

    const showDrawer = (record: DataType) => {
        setSelectedRecord(record);
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        setSelectedRecord(null);
    };

    const handleSearch = (value: string) => {
        const filteredData = originalDataSource.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.email.toLowerCase().includes(value.toLowerCase())
        );
        setDataSource(filteredData);
    };

    const columns: TableColumnsType<DataType> = [
        { title: 'Date', dataIndex: 'date', key: 'date' },
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
        {
            title: '',
            dataIndex: 'showReport',
            key: 'showReport',
            render: (_, record) => <a onClick={() => showDrawer(record)}>Report</a>,
        },
    ];

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
            <Drawer
                title={selectedRecord ? `${selectedRecord.name}'s Report` : 'Report Details'}
                width={830}
                placement="left"
                closable={false}
                onClose={onClose}
                open={open}
                // extra={
                //     <Space>
                //         <Button onClick={onClose}>Deny</Button>
                //         <Button type="primary" onClick={onClose}>Accept</Button>
                //     </Space>
                // }
            >
                {selectedRecord && (
                    <>
                        <Row>
                            <Col span={24}>
                                <div>
                                    <p><strong>Date:</strong> {selectedRecord.date}</p>
                                    <p><strong>Name:</strong> {selectedRecord.name}</p>
                                    <p><strong>Email:</strong> {selectedRecord.email}</p>
                                    <p><strong>Content:</strong></p>
                                    <p>Toi bi boc lot suc lao dong hay cuu toi</p>
                                </div>
                            </Col>
                        </Row>
                        <Divider />
                    </>
                )}
            </Drawer>
        </>
    );
};

export default App;