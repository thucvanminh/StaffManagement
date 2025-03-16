import React from 'react';
import { Col, Divider, Row } from 'antd';
import BusinessTripTable from './BusinessTripTable';
import BusinessTripList from './BusinessTripList';

const App = () => (
    <>
    <Divider orientation="left"></Divider>
            <Row>
                <Col span={24} order={1}>
                <BusinessTripList />
                </Col>
            </Row>
    </>
);

export default App;