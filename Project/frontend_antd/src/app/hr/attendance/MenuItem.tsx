import React from 'react';
import { Col, Divider, Row } from 'antd';
import AttendanceFeed from './AttendanceFeed';
const App = () => (
    <>
        
        <Divider orientation="left"></Divider>
        <Row>
            <Col span={24} order={1}>
                <AttendanceFeed />
            </Col>
        </Row>
    </>
);
export default App;