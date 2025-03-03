import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Activity Feed',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Approve</a>
        <a>Deny</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'Anh Hieu',
    tags: ['ui designer', 'frontend'],
},
{
    key: '2',
    name: 'Khanh Binh',
    tags: ['loser'],
},
{
    key: '3',
    name: 'Minh Thuc',
    tags: ['backend', 'ui designer'],
},
{
    key: '4',
    name: 'Gia Kiet',
    tags: ['freshman', 'ui designer'],
},
{
    key: '5',
    name: 'Thanh Long',
    tags: ['fullstack'],
},
{
    key: '6',
    name: 'Khanh Minh',
    tags: ['fullstack'],
},
];

const ActivityFeed: React.FC = () => <Table<DataType> columns={columns} dataSource={data} />;

export default ActivityFeed;