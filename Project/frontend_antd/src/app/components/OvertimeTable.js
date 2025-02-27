import React, { useState } from 'react';
import { DownOutlined, PicCenterOutlined } from '@ant-design/icons';
import { Form, Radio, Space, Table } from 'antd';
import TimePicker from '../components/TimePicker';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age,
    },
    
    {
        title: 'Address',
        dataIndex: 'address',
        filters: [
            {
                text: 'London',
                value: 'London',
            },
            {
                text: 'New York',
                value: 'New York',
            },
        ],
        onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
        title: 'Time',
        dataIndex: 'Time',
        render: () => (
            <Form.Item className="RangePicker">
                <TimePicker size="small"/>
            </Form.Item>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        sorter: true,
        render: () => (
            <Space size="middle">
                <a>Approve</a>
                <a>
                    <Space>
                        More
                        <DownOutlined>
                            <a>asd</a>
                        </DownOutlined>
                    </Space>
                </a>
            </Space>
        ),
    },
];
const data = Array.from({
    length: 10,
}).map((_, i) => ({
    key: i,
    name: 'John Brown',
    age: Number(`${i}2`),
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
}));
const defaultExpandable = {
    expandedRowRender: (record) => <p>{record.description}</p>,
};
const defaultTitle = () => '';
const OvertimeTable = () => {
    const [bordered, setBordered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [size, setSize] = useState('large');
    const [expandable, setExpandable] = useState(defaultExpandable);
    const [showTitle, setShowTitle] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [rowSelection, setRowSelection] = useState({});
    const [hasData, setHasData] = useState(true);
    const [tableLayout, setTableLayout] = useState('unset');
    const [top, setTop] = useState('none');
    const [bottom, setBottom] = useState('bottomRight');
    const [ellipsis, setEllipsis] = useState(false);
    const [yScroll, setYScroll] = useState(false);
    const [xScroll, setXScroll] = useState('unset');
    const handleBorderChange = (enable) => {
        setBordered(enable);
    };
    const handleLoadingChange = (enable) => {
        setLoading(enable);
    };
    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };
    const handleTableLayoutChange = (e) => {
        setTableLayout(e.target.value);
    };
    const handleExpandChange = (enable) => {
        setExpandable(enable ? defaultExpandable : undefined);
    };
    const handleEllipsisChange = (enable) => {
        setEllipsis(enable);
    };
    const handleTitleChange = (enable) => {
        setShowTitle(enable);
    };
    const handleHeaderChange = (enable) => {
        setShowHeader(enable);
    };
    const handleFooterChange = (enable) => {
        setShowFooter(enable);
    };
    const handleRowSelectionChange = (enable) => {
        setRowSelection(enable ? {} : undefined);
    };
    const handleYScrollChange = (enable) => {
        setYScroll(enable);
    };
    const handleXScrollChange = (e) => {
        setXScroll(e.target.value);
    };
    const handleDataChange = (newHasData) => {
        setHasData(newHasData);
    };
    const scroll = {};
    if (yScroll) {
        scroll.y = 240;
    }
    if (xScroll !== 'unset') {
        scroll.x = '100vw';
    }
    const tableColumns = columns.map((item) => ({
        ...item,
        ellipsis,
    }));
    if (xScroll === 'fixed') {
        tableColumns[0].fixed = true;
        tableColumns[tableColumns.length - 1].fixed = 'right';
    }
    const tableProps = {
        bordered,
        loading,
        size,
        expandable,
        title: showTitle ? defaultTitle : undefined,
        showHeader,
        rowSelection,
        scroll,
        tableLayout: tableLayout === 'unset' ? undefined : tableLayout,
    };
    return (
        <>
            <Form
                layout="inline"
                className="table-demo-control-bar"
                style={{
                    marginBottom: 16,
                }}
            >
                <Form.Item className="Bordered">
                    <Radio.Group checked={bordered} onChange={handleBorderChange} />
                </Form.Item>
                <Form.Item className="Column Header">
                    <Radio.Group checked={showHeader} onChange={handleHeaderChange} />
                </Form.Item>
                <Form.Item className="Expandable">
                    <Radio.Group checked={expandable} onChange={handleExpandChange} />
                </Form.Item>
                <Form.Item className="Checkbox">
                    <Radio.Group checked={rowSelection} onChange={handleRowSelectionChange} />
                </Form.Item>
                {/* <Form.Item label="Fixed Header">
                    <Switch checked={!!yScroll} onChange={handleYScrollChange} />
                </Form.Item> */}
                <Form.Item className="Has Data">
                    <Radio.Group value={hasData} />
                </Form.Item>
                <Form.Item className="Size">
                    <Radio.Group value={size} onChange={(e) => setSize(e.middle)}>
                    </Radio.Group>
                </Form.Item>
                <Form.Item className="Table Scroll">
                    <Radio.Group value={xScroll} onChange={(e) => setXScroll(e.unset)}>
                    </Radio.Group>
                </Form.Item>
                <Form.Item className="Table Layout">
                    <Radio.Group value={tableLayout} onChange={(e) => setTableLayout(e.fixed)}>
                    </Radio.Group>
                </Form.Item>
                <Form.Item className="Pagination Bottom">
                    <Radio.Group value={bottom} onChange={(e) => setBottom(e.BottomCenter)}>
                    </Radio.Group>
                </Form.Item>
            </Form>
            <Table
                {...tableProps}
                pagination={{
                    position: [top, bottom],
                }}
                columns={tableColumns}
                dataSource={hasData ? data : []}
                scroll={scroll}
            />
        </>
    );
};
export default OvertimeTable;