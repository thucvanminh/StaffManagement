import React from 'react';
import { Col, Divider, Row} from 'antd';
import ReportForm from './ReportForm';
const App = () => (
    <>
        <Divider orientation="left"></Divider>
        <Row>
            <Col span={24} order={1}>
                <ReportForm />
            </Col>

        </Row>
    </>
);
export default App;