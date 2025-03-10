import React, { useState } from 'react';
import '@ant-design/v5-patch-for-react-19';
import type { GetProp, TableProps } from 'antd';
import { Form, Input, Radio, Select, Space, Table } from 'antd';
import './Transfer.css';
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
}
const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
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
    title: 'Destination',
    dataIndex: 'destination',
    render: () => (
      <Select
        style={{ width: 200 }}
        onChange={handleChange}
        options={[
          { value: 'department_a', label: 'Department A' },
          { value: 'department_b', label: 'Department B' },
          { value: 'department_c', label: 'Department C' },
          { value: 'department_d', label: 'Department D' },

        ]}
      />
    ),
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
    onFilter: (value, record) => record.destination.indexOf(value as string) === 0,
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>Approve</a>
      </Space>
    ),
  },
];

const originalData = Array.from({ length: 10 }).map<DataType>((_, i) => ({
  key: i,
  name: 'John Brown',
  position: 'Developer',
  department: 'Department A',
  destination: 'Department B',
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
    </>
  );
};

export default App;