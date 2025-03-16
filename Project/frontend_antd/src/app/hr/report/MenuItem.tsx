import React from 'react';
import { Col, Divider, Row} from 'antd';
import ReportMenu from './ReportMenu';

const App = () => (
    <>
        <Divider orientation="left"></Divider>
        <Row>
            <Col span={24} order={3}>
                <ReportMenu />
            </Col>
        </Row>
    </>
);
export default App;