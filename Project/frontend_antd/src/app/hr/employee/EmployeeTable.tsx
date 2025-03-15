import React, { useEffect, useState } from 'react';
import type { TableColumnsType } from 'antd';
import { Input, Table } from 'antd';
import API from '../../services/api'; // Đảm bảo đường dẫn đúng

interface DataType {
    key: React.Key;
    name: string;
    dob: string;
    email: string;
    phone: string;
    address: string;
    position: string;
    department: string;
}


const originalDataSource = Array.from({ length: 50 })
    .map<DataType>((_, i) => ({
        key: i.toString(),
        name: 'Tran Van A',
        dob: '16/5/2000',
        email: 'abc@gmail.com',
        phone: '0123456789',
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

    // Tính dữ liệu cho trang hiện tại
    const paginatedData = dataSource.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const columns: TableColumnsType<DataType> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'DOB', dataIndex: 'dob', key: 'dob' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Position', dataIndex: 'position', key: 'position' },
        { title: 'Department', dataIndex: 'department', key: 'department' },
    ];

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
        </>
    );
};

export default App;