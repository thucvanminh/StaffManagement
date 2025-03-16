import React, { useState } from 'react';
import '@ant-design/v5-patch-for-react-19';
import type { GetProp, TableProps } from 'antd';
import { Form, Input, Radio, Space, Table, Button, Drawer, Col, Row, DatePicker, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BusinessTripTable from './BusinessTripTable';
import './BusinessTripTable.css';

type SizeType = TableProps['size'];
type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;
type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
type TablePaginationPosition = NonNullable<TablePagination<any>['position']>[number];

interface DataType {
    key: number;
    name: string;
    position: string;
    department: string;
    destination: string;
    status: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Position',
        dataIndex: 'position',
        filters: [
            {
                text: 'Developer',
                value: 'Developer',
            },
            {
                text: 'Intern',
                value: 'Intern',
            },
            {
                text: 'Freshman',
                value: 'Freshman',
            },
            {
                text: 'Accountant',
                value: 'Accountant',
            },
        ],
        onFilter: (value, record) => record.position.indexOf(value as string) === 0,
    },
    {
        title: 'Department',
        dataIndex: 'department',
        filters: [
            {
                text: 'Department A',
                value: 'Department A',
            },
            {
                text: 'Department B',
                value: 'Department B',
            },
            {
                text: 'Department C',
                value: 'Department C',
            },
            {
                text: 'Department D',
                value: 'Department D',
            },
        ],
        onFilter: (value, record) => record.department.indexOf(value as string) === 0,
    },
    {
        title: 'Time',
        dataIndex: 'time',
    },
    {
        title: 'Destination',
        dataIndex: 'destination',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="middle">
                <a>Remove</a>
            </Space>
        ),
    },
];

const originalData = Array.from({ length: 10 }).map<DataType>((_, i) => ({
    key: i,
    name: 'John Brown',
    position: 'Developer',
    department: 'Department A',
    time: '10/8/2025 12:00:00 - 15/8/2025 18:00:00',
    destination: 'TP.HCM, Quận 5',
    status: 'Pending / In Progress / Finished',
}));

const defaultTitle = () => '';
const defaultFooter = () => '';

const App: React.FC = () => {
    const [bordered, setBordered] = useState(false);
    const [loading] = useState(false);
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
    const [dataSource, setDataSource] = useState(originalData);

    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        form.resetFields(); // Reset form khi đóng
        setOpen(false);
    };

    const onSubmit = () => {
        form.validateFields()
            .then((values) => {
                const newEmployee: DataType = {
                    key: dataSource.length,
                    name: values.name,
                    position: values.position,
                    department: values.department,
                    time: `${values.dateTime[0].format('DD/MM/YYYY HH:mm:ss')} - ${values.dateTime[1].format('DD/MM/YYYY HH:mm:ss')}`,
                    destination: values.destination,
                    status: values.status,
                };
                setDataSource([...dataSource, newEmployee]);
                onClose();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleBorderChange = (enable: boolean) => {
        setBordered(enable);
    };

    const handleHeaderChange = (enable: boolean) => {
        setShowHeader(enable);
    };

    const handleSearch = (value: string) => {
        const filteredData = originalData.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setDataSource(filteredData);
    };

    const scroll: { x?: number | string; y?: number | string } = {};
    if (yScroll) {
        scroll.y = 240;
    }
    if (xScroll !== 'unset') {
        scroll.x = '100vw';
    }

    const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
    if (xScroll === 'fixed') {
        tableColumns[0].fixed = true;
        tableColumns[tableColumns.length - 1].fixed = 'right';
    }

    const tableProps: TableProps<DataType> = {
        bordered,
        loading,
        size,
        title: showTitle ? defaultTitle : undefined,
        showHeader,
        footer: showFooter ? defaultFooter : undefined,
        scroll,
        tableLayout: tableLayout === 'unset' ? undefined : (tableLayout as TableProps['tableLayout']),
    };

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
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showDrawer}
                size="large"
                style={{ marginLeft: 6, marginBottom: 16 }}
            >
                New Employee
            </Button>
            <Form
                layout="inline"
                className="table-demo-control-bar"
                style={{
                    marginBottom: 16,
                }}
            >
                <Form.Item className="Bordered">
                    <Radio.Group value={bordered} onChange={(e) => handleBorderChange(e.target.checked)} />
                </Form.Item>
                <Form.Item className="Column Header">
                    <Radio.Group value={showHeader} onChange={(e) => handleHeaderChange(e.target.checked)} />
                </Form.Item>
                <Form.Item className="Has Data">
                    <Radio.Group value={hasData} />
                </Form.Item>
                <Form.Item className="Size">
                    <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
                    </Radio.Group>
                </Form.Item>
                <Form.Item className="Table Scroll">
                    <Radio.Group value={xScroll} onChange={(e) => setXScroll(e.target.value)}>
                    </Radio.Group>
                </Form.Item>
                <Form.Item className="Table Layout">
                    <Radio.Group value={tableLayout} onChange={(e) => setTableLayout(e.target.value)}>
                    </Radio.Group>
                </Form.Item>
                <Form.Item className="Pagination Bottom">
                    <Radio.Group value={bottom} onChange={(e) => setBottom(e.target.value)}>
                    </Radio.Group>
                </Form.Item>
            </Form>
            <>
            </>
            <Table<DataType>
                {...tableProps}
                pagination={{ position: [top, bottom] }}
                columns={tableColumns}
                dataSource={hasData ? dataSource : []}
                scroll={scroll}
            />
            <Drawer
                title="Add New Employee for Business Trip"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onSubmit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter employee name' }]}
                            >
                                <Input placeholder="Please enter employee name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="position"
                                label="Position"
                                rules={[{ required: true, message: 'Please enter position' }]}
                            >
                                <Select placeholder="Please select position">
                                    <Select.Option value="Developer">Developer</Select.Option>
                                    <Select.Option value="Intern">Intern</Select.Option>
                                    <Select.Option value="Freshman">Freshman</Select.Option>
                                    <Select.Option value="Accountant">Accountant</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="department"
                                label="Department"
                                rules={[{ required: true, message: 'Please select department' }]}
                            >
                                <Select placeholder="Please select department">
                                    <Select.Option value="Department A">Department A</Select.Option>
                                    <Select.Option value="Department B">Department B</Select.Option>
                                    <Select.Option value="Department C">Department C</Select.Option>
                                    <Select.Option value="Department D">Department D</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="dateTime"
                                label="Time"
                                rules={[{ required: true, message: 'Please choose the time range' }]}
                            >
                                <DatePicker.RangePicker
                                    showTime
                                    style={{ width: '100%' }}
                                    getPopupContainer={(trigger) => trigger.parentElement!}
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
                                <Input placeholder="Please enter destination" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default App;