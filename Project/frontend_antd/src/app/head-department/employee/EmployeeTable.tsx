import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import employeeService from '../../services/employeeService';
import { useRouter } from 'next/navigation';

// interface Employee {
//     employeeID: number;
//     fullName: string;
//     email: string;
//     phone: string;
//     department: {
//         departmentName: string;
//     };
//     role: {
//         roleName: string;
//     };
// }
// Dùng type inference để lấy kiểu dữ liệu từ hàm getAllEmployees và đặt tên là Employee
type Employee = Awaited<ReturnType<typeof employeeService.getAllEmployees>>;


const EmployeeTable: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [employees, setEmployees] = useState<Employee[]>([]);

    const columns: ColumnsType<Employee> = [
        {
            title: 'ID',
            dataIndex: 'employeeID',
            key: 'employeeID',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Phòng ban',
            dataIndex: ['department', 'departmentName'],
            key: 'department',
        },
        {
            title: 'Chức vụ',
            dataIndex: ['role', 'roleName'],
            key: 'role',
        },
    ];

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const data = await employeeService.getAllEmployees();
            setEmployees(data);
        } catch (error: any) {
            if (error.message.includes('đăng nhập')) {
                message.error('Vui lòng đăng nhập để tiếp tục');
                router.push('/login');
            } else {
                message.error(error.message || 'Không thể tải danh sách nhân viên');
            }
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            message.error('Vui lòng đăng nhập để tiếp tục');
            router.push('/login');
            return;
        }
        fetchEmployees();
    }, [router]);

    return (
        <Table<Employee>
            columns={columns}
            dataSource={employees}
            rowKey={(record) => record.employeeID.toString()}
            loading={loading}
            pagination={{ pageSize: 10 }}
        />
    );
};

export default EmployeeTable;
