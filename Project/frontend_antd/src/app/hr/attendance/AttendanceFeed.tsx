import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Dropdown, Input, Pagination, Space, Table } from 'antd';

interface DataType {
    key: React.Key;
    name: string;
    createdAt: string;
    position: string;
}

const items = [
    { key: '1', label: 'Action 1' },
    { key: '2', label: 'Action 2' },
];

const originalDataSource = Array.from({ length: 100 }) // Tổng số mục là 85
    .map<DataType>((_, i) => ({
        key: i.toString(),
        name: 'Tran Van A',
        createdAt: '23:12:00 1/1/2025',
        position: 'Group A',
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

    // Xử lý thay đổi trang
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Tính dữ liệu cho trang hiện tại
    const paginatedData = dataSource.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const columns: TableColumnsType<DataType> = [
        { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Position', dataIndex: 'position', key: 'position' },

        {
            title: 'Action',
            key: 'operation',
            render: () => (
                <Space size="middle">
                    <Dropdown menu={{ items }}>
                        <a>
                            More <DownOutlined />
                        </a>
                    </Dropdown>
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
                style={{ width: 400, marginBottom: 16 }}
            />
            <Table<DataType>
                columns={columns}
                dataSource={paginatedData}
                pagination={false} // Tắt phân trang mặc định của Table
            />
            <Pagination
                align="center"
                total={dataSource.length}
                showTotal={(total) => `Total ${total} items`}
                defaultPageSize={pageSize}
                current={currentPage}
                onChange={handlePageChange}
                style={{ marginTop: 16 }}
            />
        </>
    );
};

export default App;