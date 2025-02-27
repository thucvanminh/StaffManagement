import React from 'react';
import { Col, Divider, Row, Space, Table, Tag } from 'antd';
import CalendarMenu from './CalendarMenu';
import NoticeList from './NoticeList';


const columns = [
    {
        title: 'Activity Feed',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'Loser') {
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
];
const data = [
    {
        key: '1',
        name: 'Anh Hieu',
        tags: ['UI Designer', 'Frontend'],
    },
    {
        key: '2',
        name: 'Khanh Binh',
        tags: ['Loser'],
    },
    {
        key: '3',
        name: 'Minh Thuc',
        tags: ['Backend', 'UI Designer'],
    },
    {
        key: '3',
        name: 'Gia Kiet',
        tags: ['Freshman', 'UI Designer'],
    },
    {
        key: '3',
        name: 'Thanh Long',
        tags: ['Fullstack'],
    },
    {
        key: '3',
        name: 'Khanh Minh',
        tags: ['Fullstack'],
    },
];

const App = () => (
    <>
        <Divider orientation="left"></Divider>
        <Row>
            <Col span={7} order={3}>
                <CalendarMenu />
            </Col>
            <Col span={3} order={2}>
            </Col>
            <Col span={14} order={1}>
                <NoticeList />
            </Col>

        </Row>
        <Divider orientation="left"></Divider>
        <Row>
            <Col span={7} order={3}>
                <CalendarMenu />
            </Col>
            <Col span={3} order={2}>
            </Col>
            <Col span={14} order={1}>
                <Table columns={columns} dataSource={data} />;
            </Col>

        </Row>
    </>
);
export default App;