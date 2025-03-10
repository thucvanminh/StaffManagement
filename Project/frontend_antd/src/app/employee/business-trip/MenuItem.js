import React from 'react';
import { Col, Divider, Row } from 'antd';
import CalendarMenu from '../../components/CalendarMenu';
import ActivityFeed from '../../components/ActivityFeed';
import TaskTimeline from '../../components/TaskTimeline';
import OvertimeTable from '../../hr/overtime/OvertimeTable';
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
                <ActivityFeed />
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
                <OvertimeTable />
            </Col>

        </Row>
    </>
);
export default App;