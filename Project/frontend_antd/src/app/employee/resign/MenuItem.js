import React from 'react';
import { Col, Divider, Row} from 'antd';
import CalendarMenu from '../../components/CalendarMenu';
import NoticeList from '../../components//NoticeList';
import ActivityFeed from './ActivityFeed';
import TaskTimeline from '../../components//TaskTimeline';
import ResignList from './ResignList'
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
            <Col span={24} order={3}>
                <ResignList />
            </Col>

        </Row>
    </>
);
export default App;