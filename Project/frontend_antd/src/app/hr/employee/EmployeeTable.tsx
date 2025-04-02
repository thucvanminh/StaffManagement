import React, { useEffect, useState } from 'react';
import { Table, message, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import employeeService from '../../services/employeeService';
import { useRouter } from 'next/navigation';

type Employee = Awaited<ReturnType<typeof employeeService.getAllEmployees>>;

const EmployeeTable: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]); // State mới để lưu danh sách đã lọc
    const [searchText, setSearchText] = useState<string>(''); // State để lưu giá trị tìm kiếm

    const columns: ColumnsType<Employee> = [
        {
            title: 'EmployeeID',
            dataIndex: 'employeeID',
            key: 'employeeID',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Department',
            dataIndex: ['department', 'departmentName'],
            key: 'department',
        },
        {
            title: 'Role',
            dataIndex: ['role', 'roleName'],
            key: 'role',
        },
    ];

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const data = await employeeService.getAllEmployees();
            setEmployees(data);
            setFilteredEmployees(data); // Khởi tạo danh sách đã lọc bằng danh sách gốc
        } catch (error: any) {
            if (error.message.includes('login')) {
                message.error('Please login to continue');
                router.push('/login');
            } else {
                message.error(error.message || 'Cannot load employee list');
            }
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            message.error('Please login to continue');
            router.push('/login');
            return;
        }
        fetchEmployees();
    }, [router]);

    // Hàm xử lý tìm kiếm
    const handleSearch = (value: string) => {
        setSearchText(value);
        if (value.trim() === '') {
            setFilteredEmployees(employees); // Nếu ô tìm kiếm rỗng, hiển thị toàn bộ danh sách
        } else {
            const filtered = employees.filter((employee) =>
                [employee.fullName, employee.email, employee.phone || '']
                    .some((field) =>
                        field.toLowerCase().includes(value.toLowerCase())
                    )
            );
            setFilteredEmployees(filtered);
        }
    };

    return (
        <div>
            <Input.Search
                placeholder="Search by name, email, or phone"
                allowClear
                enterButton="Search"
                size="large"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)} // Cập nhật realtime khi nhập
                onSearch={handleSearch} // Xử lý khi nhấn Enter hoặc nút Search
                style={{ width: 400, marginBottom: 16 }}
            />
            <Table
                columns={columns}
                dataSource={filteredEmployees} // Sử dụng danh sách đã lọc thay vì danh sách gốc
                rowKey={(record) => record.employeeID.toString()}
                loading={loading}
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default EmployeeTable;