import React from 'react';
import type { StatisticProps } from 'antd';
import { Col, Row, Statistic } from 'antd';
import {
    LikeOutlined,
} from '@ant-design/icons';
import CountUp from 'react-countup';

const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator="," />
);

const App: React.FC = () => (
    <Row gutter={16}>
        <Col span={12}>
            <Statistic title="Active Users" value={123} formatter={formatter} />
        </Col>
        <Col span={12}>
            <Statistic title="Idle Users" value={12} precision={2} formatter={formatter} />
        </Col>
        <Col span={12}>
            <Statistic title="Reports" value={32} />
        </Col>
        <Col span={12}>
            <Statistic title="Attended" value={126} suffix="/ 135" />
        </Col>
    </Row>

);

export default App;