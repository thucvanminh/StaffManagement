import React from 'react';
import { Col, Divider, Row} from 'antd';
import AbsenceTable from './AbsenceTable';
import ResignTable from './ResignTable';
const App = () => (
    <>
        <Divider orientation="left"></Divider>
        <Row>
            <Col span={24} order={1}>
                <AbsenceTable />
            </Col>
            

        </Row>
        <Divider orientation="left"></Divider>
        <Row>
            <Col span={24} order={3}>
                <ResignTable />
            </Col>
           

        </Row>
    </>
);
export default App;