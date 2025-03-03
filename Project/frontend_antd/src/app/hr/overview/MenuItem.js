import React from 'react';
import { Col, Divider, Row } from 'antd';
import NoticeList from '../../components//NoticeList';
import ActivityFeed from '../../components//ActivityFeed';
import Statistic from '../../components/Statistic';
import SimpleCalendar from '../../components/SimpleCalendar';
import ProgressChart from '../../components/ProgressChart';
const App = () => (
    <>

        <Divider orientation="left"></Divider>
        <Row>
            <Col span={14} order={1}>
                <NoticeList />
            </Col>
            <Col span={4} order={2}>
            </Col>
            <Col span={6} order={3}>
                <SimpleCalendar />
            </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row>
            {/* <Col span={7} order={3}>
                <Statistic />
            </Col>
            <Col span={3} order={2}>
            </Col> */}
            <Col span={24} order={1}>
                <ProgressChart />
            </Col>
        </Row>
    </>
);
export default App;