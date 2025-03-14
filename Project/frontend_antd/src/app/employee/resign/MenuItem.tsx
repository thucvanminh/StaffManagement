import React from 'react';
import { Col, Divider, Row} from 'antd';
import ResignForm from './ResignForm';
const App = () => (
    <>
        <Divider orientation="left"></Divider>
        <Row>
            <Col span={24} order={1}>
                <ResignForm />
            </Col>

        </Row>
    </>
);
export default App;