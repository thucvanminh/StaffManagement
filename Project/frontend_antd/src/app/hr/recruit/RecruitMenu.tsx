// // frontend_antd/src/app/hr/recruit/RecruitMenu.tsx
// import React, { useState } from 'react';
// import type { TableColumnsType } from 'antd';
// import { Input, Table, Drawer, Row, Col, Divider, Space, Button } from 'antd';
// import './RecruitMenu.css';
//
// interface DataType {
//     key: React.Key;
//     name: string;
//     gender: string;
//     dob: string;
//     email: string;
//     phone: string;
//     address: string;
//     showCV: string;
// }
//
// const originalDataSource = Array.from({ length: 50 }).map<DataType>((_, i) => ({
//     key: i.toString(),
//     name: 'Tran Van A',
//     gender: 'Male',
//     dob: '16/5/2000',
//     email: 'abc@gmail.com',
//     phone: '0123456789',
//     address: 'Hanoi',
//     showCV: 'CV',
// }));
//
// const App: React.FC = () => {
//     const [dataSource, setDataSource] = useState(originalDataSource);
//     const [open, setOpen] = useState(false);
//     const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);
//
//     const showDrawer = (record: DataType) => {
//         setSelectedRecord(record);
//         setOpen(true);
//     };
//
//     const onClose = () => {
//         setOpen(false);
//         setSelectedRecord(null);
//     };
//
//     const handleSearch = (value: string) => {
//         const filteredData = originalDataSource.filter((item) =>
//             item.name.toLowerCase().includes(value.toLowerCase())
//         );
//         setDataSource(filteredData);
//     };
//
//     const columns: TableColumnsType<DataType> = [
//         { title: 'Name', dataIndex: 'name', key: 'name' },
//         { title: 'Gender', dataIndex: 'gender', key: 'gender' },
//         { title: 'DOB', dataIndex: 'dob', key: 'dob' },
//         { title: 'Email', dataIndex: 'email', key: 'email' },
//         { title: 'Phone', dataIndex: 'phone', key: 'phone' },
//         {
//             title: '',
//             dataIndex: 'showCV',
//             key: 'showCV',
//             render: (_, record) => <a onClick={() => showDrawer(record)}>CV</a>,
//         },
//     ];
//
//     return (
//         <>
//             <Input.Search
//                 placeholder="Search by Name"
//                 allowClear
//                 enterButton="Search"
//                 size="large"
//                 onSearch={handleSearch}
//                 style={{ width: 500, marginBottom: 16 }}
//             />
//             <Table<DataType>
//                 columns={columns}
//                 dataSource={dataSource}
//                 pagination={{ pageSize: 10 }}
//             />
//             <Drawer
//                 title={selectedRecord ? `${selectedRecord.name}'s CV` : 'User Profile'}
//                 width={830}
//                 placement="left"
//                 closable={false}
//                 onClose={onClose}
//                 open={open}
//                 extra={
//                     <Space>
//                         <Button onClick={onClose}>Deny</Button>
//                         <Button type="primary" onClick={onClose}>Accept</Button>
//                     </Space>
//                 }
//             >
//                 {selectedRecord && (
//                     <>
//                         <Row>
//                             <Col span={24}>
//                                 <div className="site-description-item-cv-wrapper">
//                                     <img src="/images/IT_CV.jpg" alt="CV" />
//                                 </div>
//                             </Col>
//                         </Row>
//                         <Divider />
//                     </>
//                 )}
//             </Drawer>
//         </>
//     );
// };
//
// export default App;


import React, { useState, useEffect } from 'react';
import { Input, Table, Drawer, Row, Col, Divider, Space, Button, message } from 'antd';
import type { TableColumnsType } from 'antd';
import RecruitmentService from '../../services/recruitmentService';
import './RecruitMenu.css';

interface DataType {
    key: React.Key;
    name: string;
    gender: string;
    email: string;
    phone: string;
    position: string;
    showCV: string;
    resumeLink: string;
}

const App: React.FC = () => {
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [originalDataSource, setOriginalDataSource] = useState<DataType[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<DataType | null>(null);

    // Lấy dữ liệu từ API khi component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RecruitmentService.getAllRecruitmentRequests();
                const formattedData = response.data.map((item) => ({
                    key: item.recruitmentRequestID.toString(),
                    name: item.applicantName,
                    gender: item.gender,
                    email: item.applicantEmail,
                    phone: item.applicantPhone || 'N/A',
                    position: item.position,
                    showCV: 'CV',
                    resumeLink: item.resumeLink || 'N/A',
                }));
                setDataSource(formattedData);
                setOriginalDataSource(formattedData); // Lưu dữ liệu gốc
            } catch (error) {
                message.error('Không thể lấy danh sách đơn xin việc');
                console.error('Error fetching recruitment requests:', error);
            }
        };

        fetchData();
    }, []);

    // Mở drawer để xem CV
    const showDrawer = (record: DataType) => {
        setSelectedRecord(record);
        setOpen(true);
    };

    // Đóng drawer
    const onClose = () => {
        setOpen(false);
        setSelectedRecord(null);
    };

    // Tìm kiếm theo tên
    const handleSearch = (value: string) => {
        if (!value) {
            setDataSource(originalDataSource);
            return;
        }
        const filteredData = originalDataSource.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setDataSource(filteredData);
    };

    // Định nghĩa các cột cho bảng
    const columns: TableColumnsType<DataType> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Gender', dataIndex: 'gender', key: 'gender' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Position', dataIndex: 'position', key: 'position' },
        {
            title: '',
            dataIndex: 'showCV',
            key: 'showCV',
            render: (_, record) => <a onClick={() => showDrawer(record)}>View CV</a>,
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
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 10 }}
            />
            <Drawer
                title={selectedRecord ? `${selectedRecord.name}'s CV` : 'CV Preview'}
                width={830}
                placement="left"
                closable={false}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Close</Button>
                    </Space>
                }
            >
                {selectedRecord && (
                    <>
                        <Row>
                            <Col span={24}>
                                <div className="site-description-item-cv-wrapper">
                                    {selectedRecord.resumeLink !== 'N/A' ? (
                                        <iframe
                                            src={selectedRecord.resumeLink}
                                            width="100%"
                                            height="600px"
                                            title="CV"
                                        />
                                    ) : (
                                        <p>Không có CV để hiển thị</p>
                                    )}
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