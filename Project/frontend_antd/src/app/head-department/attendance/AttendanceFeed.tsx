import React, { useState } from 'react';
import type { TableColumnsType } from 'antd';
import {Input, Space, Table } from 'antd';

interface DataType {
    key: React.Key;
    name: string;
    createdAt: string;
    position: string;
    department: string;

}


const originalDataSource = Array.from({ length: 50 })
    .map<DataType>((_, i) => ({
        key: i.toString(),
        name: 'Tran Van A',
        createdAt: '1/1/2025 23:12:00',
        position: 'Group A',
        department: 'Department A',
    }));

const App: React.FC = () => {
    const [dataSource, setDataSource] = useState(originalDataSource);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const handleSearch = (value: string) => {
        setSearchText(value);
        setCurrentPage(1);
        const filteredData = originalDataSource.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setDataSource(filteredData);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedData = dataSource.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const columns: TableColumnsType<DataType> = [
        { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Position', dataIndex: 'position', key: 'position' },
        { title: 'Department', dataIndex: 'department', key: 'department' },

        {
            title: 'Action',
            key: 'operation',
            render: () => (
                <Space size="middle">
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
            <Table<DataType>
                columns={columns}
                dataSource={paginatedData}
            />
        </>
    );
};

export default App;