import React from 'react';
import type { StatisticProps } from 'antd';
import { Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';

const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator="," />
);

const App: React.FC = () => (
    <Row gutter={16}>
        <Col span={12}>
            <Statistic title="Active Users" value={132} formatter={formatter} />
        </Col>
        <Col span={12}>
            <Statistic title="Idle Users" value={12} precision={2} formatter={formatter} />
        </Col>
        <Col span={12}>
            <Statistic title="Attended" value={144} suffix="/ 150" />
        </Col>
        <Col span={12}>
            <Statistic title="New Hires" value={20} formatter={formatter} />
        </Col>
        <Col span={12}>
            <Statistic title="Absent" value={5} formatter={formatter} />
        </Col>
        <Col span={12}>
            <Statistic title="Turnover" value={5} formatter={formatter} />
        </Col>
        <Col span={12}>
            <Statistic title="Overtime Hours" value={176} formatter={formatter} />
        </Col>
        <Col span={12}>
            <Statistic title="Contracts Expiring" value={8} formatter={formatter} />
        </Col>
        <Col span={12}>
            <Statistic title="Open Jobs" value={7} formatter={formatter} />
        </Col>
        <Col span={12}>
            <Statistic title="Reports" value={32} />
        </Col>
    </Row>

);

export default App;