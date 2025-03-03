import React from 'react';
import { Col, Divider, Row } from 'antd';
import CalendarMenu from '../../components/CalendarMenu';
import NoticeList from '../../components//NoticeList';
import ActivityFeed from '../../components//ActivityFeed';
import TaskTimeline from '../../components//TaskTimeline';
import Statistic from '../../components/Statistic';
import SimpleCalendar from '../../components/SimpleCalendar';
const App = () => (
    <>

        <Divider orientation="left"></Divider>
        <Row>
            <Col span={18} order={1}>
                <SimpleCalendar />
            </Col>
           
            <Col span={6} order={2}>
                <Statistic />
            </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row>
            <Col span={7} order={3}>
                <TaskTimeline />
            </Col>
            <Col span={3} order={2}>
            </Col>
            <Col span={14} order={1}>
                <ActivityFeed />
            </Col>
        </Row>
    </>
);
export default App;