import React from 'react';
import { Col, Divider, Row } from 'antd';
import BusinessTripTable from './BusinessTripTable';

const App = () => (
    <>
    <Divider orientation="left"></Divider>
            <Row>
                <Col span={24} order={1}>
                <BusinessTripTable />
                </Col>
            </Row>
    </>
);

export default App;