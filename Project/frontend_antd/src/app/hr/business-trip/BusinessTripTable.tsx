import React, { useState, useEffect } from 'react';
import '@ant-design/v5-patch-for-react-19';
import type { GetProp, TableProps } from 'antd';
import { Form, Input, Radio, Space, Table, Button, Drawer, Col, Row, DatePicker, App } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BusinessTripService from '../../services/businessTripService';
import './BusinessTripTable.css';
import { useRouter } from 'next/navigation';
import EmployeeService from '../../services/employeeService'

type SizeType = TableProps['size'];
type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;
type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
type TablePaginationPosition = NonNullable<TablePagination<any>['position']>[number];

type BusinessTrip = Awaited<ReturnType<typeof BusinessTripService.getAllBusinessTrips>>[number];

const BusinessTripTableContent: React.FC = () => {
    const { message } = App.useApp();
    const [bordered, setBordered] = useState(false);
    const [size, setSize] = useState<SizeType>('large');
    const [showTitle, setShowTitle] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [showFooter, setShowFooter] = useState(false);
    const [hasData, setHasData] = useState(true);
    const [tableLayout, setTableLayout] = useState<string>('unset');
    const [top, setTop] = useState<TablePaginationPosition>('none');
    const [bottom, setBottom] = useState<TablePaginationPosition>('bottomRight');
    const [ellipsis, setEllipsis] = useState(false);
    const [yScroll, setYScroll] = useState(false);
    const [xScroll, setXScroll] = useState<string>('unset');
    const [dataSource, setDataSource] = useState<BusinessTrip[]>([]);
    const [originalData, setOriginalData] = useState<BusinessTrip[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const columns: ColumnsType<BusinessTrip> = [
        {
            title: 'Name',
            dataIndex: ['employee', 'fullName'],
            key: 'employee.fullName',
        },
        {
            title: 'Position',
            dataIndex: ['employee', 'role', 'roleName'],
            key: 'employee.role.roleName',
            render: (_, record) => {
                const isHeadOfDepartment = EmployeeService.isHeadOfDepartment(record.employee.employeeID);
                return isHeadOfDepartment ? 'Head of Department' : record.employee.role.roleName;
            },
        },
        {
            title: 'Department',
            dataIndex: ['employee', 'department', 'departmentName'],
            key: 'employee.department.departmentName',
            render: (_, record) => {
                return record.employee.department.departmentName;
            },
        },
        {
            title: 'Time',
            key: 'time',
            render: (_, record) => {
                const startDate = new Date(record.startDate);
                const endDate = new Date(record.endDate);
                return `${startDate.toLocaleDateString('vi-VN')} - ${endDate.toLocaleDateString('vi-VN')}`;
            },
        },
        {
            title: 'Destination',
            dataIndex: 'destination',
            key: 'destination',
        },
        {
            title: 'Status',
            dataIndex: ['status', 'statusName'],
            key: 'status.statusName',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleRemove(record.businessTripID)}>Delete</a>
                </Space>
            ),
        },
    ];

    const fetchBusinessTrips = async () => {
        try {
            setIsLoading(true);
            const data = await BusinessTripService.getAllBusinessTrips();
            setOriginalData(data);
            setDataSource(data);
        } catch (error: any) {
            if (error.message.includes('login')) {
                message.error('Please login to continue');
                router.push('/login');
            } else {
                message.error(error.message || 'Cannot load business trip list');
            }
            console.error('Error fetching business trips:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBusinessTrips();
    }, []);

    const showDrawer = () => {
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        form.resetFields();
        setIsDrawerOpen(false);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const businessTripData = {
                employeeID: values.employeeID,
                startDate: values.dateTime[0].toISOString(),
                endDate: values.dateTime[1].toISOString(),
                destination: values.destination,
                reason: values.reason || 'Chuyến công tác',
            };
            await BusinessTripService.createBusinessTrip(businessTripData);
            message.success('Create business trip successfully');
            fetchBusinessTrips();
            closeDrawer();
        } catch (error) {
            console.log('Validation or submission failed:', error);
            message.error('Create business trip failed');
        }
    };

    const handleRemove = async (id: number) => {
        try {
            await BusinessTripService.deleteBusinessTrip(id);
            message.success('Delete business trip successfully');
            setOriginalData(originalData.filter(item => item.businessTripID !== id));
            setDataSource(dataSource.filter(item => item.businessTripID !== id));
        } catch (error) {
            message.error('Delete business trip failed');
            console.error('Error removing business trip:', error);
        }
    };

    const handleBorderChange = (enable: boolean) => setBordered(enable);
    const handleHeaderChange = (enable: boolean) => setShowHeader(enable);

    const handleSearch = (value: string) => {
        if (!value) {
            setDataSource(originalData);
            return;
        }
        const filteredData = originalData.filter((item) =>
            item.employee.fullName.toLowerCase().includes(value.toLowerCase())
        );
        setDataSource(filteredData);
    };

    const scroll: { x?: number | string; y?: number | string } = {};
    if (yScroll) scroll.y = 240;
    if (xScroll !== 'unset') scroll.x = '100vw';

    const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
    if (xScroll === 'fixed') {
        tableColumns[0].fixed = true;
        tableColumns[tableColumns.length - 1].fixed = 'right';
    }

    const tableProps: TableProps<BusinessTrip> = {
        bordered,
        loading: isLoading,
        size,
        title: showTitle ? () => '' : undefined,
        showHeader,
        footer: showFooter ? () => '' : undefined,
        scroll,
        tableLayout: tableLayout === 'unset' ? undefined : tableLayout as TableProps['tableLayout'],
    };

    return (
        <>
            <Input.Search
                placeholder="Search by name"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
                style={{ width: 500, marginBottom: 16 }}
            />
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showDrawer}
                size="large"
                style={{ marginLeft: 6, marginBottom: 16 }}
            >
                Add business trip
            </Button>
            <Form layout="inline" className="table-demo-control-bar" style={{ marginBottom: 16 }}>
                <Form.Item label="Border">
                    <Radio.Group value={bordered} onChange={(e) => handleBorderChange(e.target.value)} />
                </Form.Item>
                <Form.Item label="Title">
                    <Radio.Group value={showHeader} onChange={(e) => handleHeaderChange(e.target.value)} />
                </Form.Item>
            </Form>
            <Table<BusinessTrip>
                {...tableProps}
                pagination={{ position: [top, bottom] }}
                columns={tableColumns}
                dataSource={hasData ? dataSource : []}
                rowKey="businessTripID"
            />
            <Drawer
                title="Add new business trip"
                width={720}
                onClose={closeDrawer}
                open={isDrawerOpen}
                styles={{ body: { paddingBottom: 80 } }}
                extra={
                    <Space>
                        <Button onClick={closeDrawer}>Cancel</Button>
                        <Button onClick={handleSubmit} type="primary">Send</Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="employeeID"
                                label="Employee ID"
                                rules={[{ required: true, message: 'Please enter employee ID' }]}
                            >
                                <Input placeholder="Enter employee ID" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="dateTime"
                                label="Time range"
                                rules={[{ required: true, message: 'Please select time range' }]}
                            >
                                <DatePicker.RangePicker
                                    showTime
                                    style={{ width: '100%' }}
                                    format="DD/MM/YYYY HH:mm"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="destination"
                                label="Destination"
                                rules={[{ required: true, message: 'Please enter destination' }]}
                            >
                                <Input placeholder="Enter destination" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="reason"
                                label="Reason"
                                rules={[{ required: true, message: 'Please enter reason' }]}
                            >
                                <Input placeholder="Enter reason" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

// Wrap the component with App provider
const BusinessTripTable: React.FC = () => {
    return (
        <App>
            <BusinessTripTableContent />
        </App>
    );
};

export default BusinessTripTable;