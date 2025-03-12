import React, { useState } from 'react';
import type { TableColumnsType } from 'antd';
import { Input, Table, Drawer, Row, Col, Divider, Space, Button } from 'antd';
import './RecruitMenu.css';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    email: string;
    address: string;
    showProfile: string;
}

const originalDataSource = Array.from({ length: 50 })
    .map<DataType>((_, i) => ({
        key: i.toString(),
        name: 'Tran Van A',
        age: 32,
        email: 'abc@gmail.com',
        address: 'Hanoi',
        showProfile: 'Profile',
    }));

const App: React.FC = () => {
    const [dataSource, setDataSource] = useState(originalDataSource);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Số mục trên mỗi trang

    // Xử lý tìm kiếm theo Name
    const handleSearch = (value: string) => {
        setSearchText(value);
        setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
        const filteredData = originalDataSource.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setDataSource(filteredData);
    };

    // Tính dữ liệu cho trang hiện tại
    const paginatedData = dataSource.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const columns: TableColumnsType<DataType> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        {
            title: '',
            dataIndex: 'showProfile',
            key: 'showProfile',
            render: (_, record) => (
                <a onClick={() => showDrawer(record)}>Profile</a>
            ),
        },
    ];

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

    return (
        <>
            <Input.Search
                placeholder=""
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
                style={{ width: 500, marginBottom: 16 }}
            />
            <Table<DataType>
                columns={columns}
                dataSource={paginatedData}
            />
            <Drawer
                title={selectedRecord ? `${selectedRecord.name} Profile` : 'User Profile'}                width={640}
                placement="left"
                closable={false}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Deny</Button>
                        <Button type="primary" onClick={onClose}>
                            Accept
                        </Button>
                    </Space>
                }
            >
                {selectedRecord && (
                    <>
                        <p className="site-description-item-profile-p">Personal Informations</p>
                        <Row>
                            <Col span={12}>
                                <div className="site-description-item-profile-wrapper">
                                    <span className="site-description-item-profile-p-label">Full Name:</span>
                                    {selectedRecord.name}
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="site-description-item-profile-wrapper">
                                    <span className="site-description-item-profile-p-label">Email:</span>
                                    {selectedRecord.email}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <div className="site-description-item-profile-wrapper">
                                    <span className="site-description-item-profile-p-label">Age:</span>
                                    {selectedRecord.age}
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="site-description-item-profile-wrapper">
                                    <span className="site-description-item-profile-p-label">Address:</span>
                                    {selectedRecord.address}
                                </div>
                            </Col>
                        </Row>
                        <Divider />
                        <p className="site-description-item-profile-p">Contacts</p>
                        <Row>
                            <Col span={12}>
                                <div className="site-description-item-profile-wrapper">
                                    <span className="site-description-item-profile-p-label">Email:</span>
                                    {selectedRecord.email}
                                </div>
                            </Col>
                        </Row>
                    </>
                )}
            </Drawer>
        </>
    );
};

export default App;