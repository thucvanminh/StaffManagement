import React from 'react';
import { Col, Divider, Row} from 'antd';
import CalendarMenu from '../../components/CalendarMenu';
import NoticeList from '../../components//NoticeList';
import ActivityFeed from '../../components//ActivityFeed';
import TaskTimeline from '../../components//TaskTimeline';
import SettingForm  from '../../components/SettingForm';
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
                <SettingForm />
            </Col>
            

        </Row>
    </>
);
export default App;