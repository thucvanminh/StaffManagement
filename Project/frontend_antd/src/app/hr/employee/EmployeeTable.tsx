import React, { useState } from 'react';
import type { TableColumnsType } from 'antd';
import { Input, Pagination, Table } from 'antd';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    email: string;
    address: string;
    position: string;
    department: string;

}


const originalDataSource = Array.from({ length: 50 })
    .map<DataType>((_, i) => ({
        key: i.toString(),
        name: 'Tran Van A',
        age: 32,
        email: 'abc@gmail.com',
        address: 'Hanoi',
        position: 'Developer',
        department: 'Department A',
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
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Position', dataIndex: 'position', key: 'position' },
        { title: 'Department', dataIndex: 'department', key: 'department' },
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