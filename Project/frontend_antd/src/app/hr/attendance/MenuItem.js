import React from 'react';
import { Col, Divider, Row } from 'antd';
import SimpleCalendar from '../../components/SimpleCalendar';
import ActivityFeed from '../../components/ActivityFeed';
import TaskTimeline from '../../components/TaskTimeline';
import OvertimeTable from '../../components/OvertimeTable';
import AttendanceFeed from './AttendanceFeed';
const App = () => (
    <>
        
        <Divider orientation="left"></Divider>
        <Row>
            <Col span={24} order={1}>
                <AttendanceFeed />
            </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row>
            <Col span={7} order={3}>
                <SimpleCalendar />
            </Col>
            <Col span={3} order={2}>
            </Col>
            <Col span={10} order={1}>
                <ActivityFeed />
            </Col>

        </Row>
    </>
);
export default App;