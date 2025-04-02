// frontend_antd/src/app/hr/recruit/MenuIrem.tsx

import React from 'react';
import { Col, Divider, Row} from 'antd';
import RecruitMenu from './RecruitMenu';
const App = () => (
    <>
        <Divider orientation="left"></Divider>
        <Row>
            <Col span={24} order={3}>
                <RecruitMenu />
            </Col>
        </Row>
    </>
);
export default App;