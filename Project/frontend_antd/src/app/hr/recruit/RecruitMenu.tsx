import React, { useState } from 'react';
import type { TableColumnsType } from 'antd';
import { Input, Table, Drawer, Row, Col, Divider, Space, Button } from 'antd';
import './RecruitMenu.css';

interface DataType {
    key: React.Key;
    name: string;
    gender: string;
    dob: string;
    email: string;
    phone: string;
    address: string;
    showCV: string;
}

const originalDataSource = Array.from({ length: 50 }).map<DataType>((_, i) => ({
    key: i.toString(),
    name: 'Tran Van A',
    gender: 'Male',
    dob: '16/5/2000',
    email: 'abc@gmail.com',
    phone: '0123456789',
    address: 'Hanoi',
    showCV: 'CV',
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
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setDataSource(filteredData);
    };

    const columns: TableColumnsType<DataType> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Gender', dataIndex: 'gender', key: 'gender' },
        { title: 'DOB', dataIndex: 'dob', key: 'dob' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        {
            title: '',
            dataIndex: 'showCV',
            key: 'showCV',
            render: (_, record) => <a onClick={() => showDrawer(record)}>CV</a>,
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
            <Table<DataType>
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 10 }}
            />
            <Drawer
                title={selectedRecord ? `${selectedRecord.name}'s CV` : 'User Profile'}
                width={830}
                placement="left"
                closable={false}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Deny</Button>
                        <Button type="primary" onClick={onClose}>Accept</Button>
                    </Space>
                }
            >
                {selectedRecord && (
                    <>
                        <Row>
                            <Col span={24}>
                                <div className="site-description-item-cv-wrapper">
                                    <img src="/images/IT_CV.jpg" alt="CV" />
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