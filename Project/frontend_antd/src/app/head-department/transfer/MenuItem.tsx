import React from 'react';
import { Col, Divider, Row } from 'antd';
import TransferTable from './TransferTable';
const App = () => (
    <>
        <Divider orientation="left"></Divider>
        <Row>
            <Col span={24} order={1}>
                <TransferTable />
            </Col>
        </Row>
    </>
);
export default App;