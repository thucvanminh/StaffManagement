import React from 'react';
import { Col, Divider, Row} from 'antd';
import SettingForm  from '../../components/SettingForm';
const App = () => (
    <>
        <Divider orientation="left"></Divider>
        <Row>
            <Col span={24} order={3}>
                <SettingForm />
            </Col>
        </Row>
    </>
);
export default App;