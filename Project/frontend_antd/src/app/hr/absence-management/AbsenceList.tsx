// import React, { useState } from 'react';
// import type { TableColumnsType } from 'antd';
// import { Input, Table } from 'antd';
// import './Table.css';

// interface DataType {
//   key: number;
//   name: string;
//   email: string;
//   position: string;
//   department: string;
//   absenceReason: string;
//   date: string;
//   status: string;
// }

// const originalData: DataType[] = Array.from({ length: 10 }).map((_, i) => ({
//   key: i,
//   name: 'John Brown',
//   email: 'abc@gmail.com',
//   position: 'Developer',
//   department: 'Department A',
//   date: '12/12/2025',
//   absenceReason: 'Sick Leave',
//   status: 'Pending',
// }));

// const columns: TableColumnsType<DataType> = [
//   { title: 'Name', dataIndex: 'name', key: 'name' },
//   { title: 'Email', dataIndex: 'email', key: 'email' },
//   {
//     title: 'Position',
//     dataIndex: 'position',
//     key: 'position',
//     filters: [
//       { text: 'Developer', value: 'Developer' },
//       { text: 'Intern', value: 'Intern' },
//       { text: 'Freshman', value: 'Freshman' },
//       { text: 'Accountant', value: 'Accountant' },
//     ],
//     onFilter: (value, record) => record.position.indexOf(value as string) === 0,
//   },
//   {
//     title: 'Department',
//     dataIndex: 'department',
//     key: 'department',
//     filters: [
//       { text: 'Department A', value: 'Department A' },
//       { text: 'Department B', value: 'Department B' },
//       { text: 'Department C', value: 'Department C' },
//       { text: 'Department D', value: 'Department D' },
//     ],
//     onFilter: (value, record) => record.department.indexOf(value as string) === 0,
//   },
//   { title: 'Date', dataIndex: 'date', key: 'date' },
//   { title: 'Reason', dataIndex: 'absenceReason', key: 'absenceReason' },
//   { title: 'Status', dataIndex: 'status', key: 'status' },
// ];

// const App: React.FC = () => {
//   const [dataSource, setDataSource] = useState(originalData);

//   const handleSearch = (value: string) => {
//     const filteredData = originalData.filter((item) =>
//       item.name.toLowerCase().includes(value.toLowerCase()) ||
//       item.email.toLowerCase().includes(value.toLowerCase())
//     );
//     setDataSource(filteredData);
//   };

//   return (
//     <>
//       <Input.Search
//         placeholder="Search by Name or Email"
//         allowClear
//         enterButton="Search"
//         size="large"
//         onSearch={handleSearch}
//         style={{ width: 500, marginBottom: 16 }}
//       />
//       <Table<DataType>
//         columns={columns}
//         dataSource={dataSource}
//         pagination={{ pageSize: 10 }}
//       />
//     </>
//   );
// };

// export default App;


// frontend/src/AbsenceList.tsx
import React, { useState, useEffect } from 'react';
import { Input, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import './Table.css';
import leaveService from '../../services/leaveService';
import Authentication from '../../services/authentication';
import { jwtDecode } from 'jwt-decode';

interface DataType {
  key: number;
  name: string;
  email: string;
  position: string;
  department: string;
  date: string;
  absenceReason: string;
  status: string;
}

const columns: TableColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
    filters: [
      { text: 'HR', value: 'HR' },
      { text: 'Employee', value: 'Employee' },
      { text: 'Head Department', value: 'Head Department' },
    ],
    onFilter: (value, record) => record.position === value,
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
    onFilter: (value, record) => record.department === value,
  },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Reason', dataIndex: 'absenceReason', key: 'absenceReason' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
];

const AbsenceList: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const token = Authentication.getToken();
        if (!token) {
          window.location.href = '/login';
          return;
        }

        const decodedToken = jwtDecode(token);
        const roleID = decodedToken.roleID;
        if (roleID !== 1 && roleID !== 2) {
          console.error('Insufficient permissions, roleID:', roleID);
          return;
        }

        const response = await leaveService.getAllLeaveRequests();
        const leaveRequests = response.map((request: any) => {
          const employee = request.employee || {};
          const department = employee.department || {};
          let position = '';
          if (employee.roleID === 2) position = 'HR';
          else if (employee.roleID === 3) {
            position = department.HeadOfDepartmentID === employee.employeeID ? 'Head Department' : 'Employee';
          }

          return {
            key: request.leaveRequestID,
            name: employee.fullName || 'Unknown',
            email: employee.email || 'N/A',
            position,
            department: department.departmentName || 'N/A',
            date: `${new Date(request.startDate).toLocaleDateString()} - ${new Date(request.endDate).toLocaleDateString()}`,
            absenceReason: request.reason || 'N/A',
            status: request.status?.statusName || 'Unknown', // Lấy statusName từ response
          };
        });
        setDataSource(leaveRequests);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
        if (error.message === 'Token expired') {
          window.location.href = '/login';
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleSearch = (value: string) => {
    const filteredData = dataSource.filter(
      (item) =>
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
        loading={loading}
      />
    </>
  );
};

export default AbsenceList;