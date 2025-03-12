import React from 'react';
import { Col, Divider, Row } from 'antd';
import EmployeeTable from './EmployeeTable';
const App = () => (
    <>
        <Divider orientation="left"></Divider>
        <Row>
            <Col span={24} order={3}>
                <EmployeeTable />
            </Col>
        </Row>
    </>
);
export default App;