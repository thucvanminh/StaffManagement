import React from 'react';
import { Col, Divider, Row} from 'antd';
import LeaveForm from './LeaveForm';

const App = () => (
    <>
        <Divider orientation="left"></Divider>
        <Row>
            <Col span={24} order={1}>
                <LeaveForm />
            </Col>
        </Row>

    </>
);
export default App;