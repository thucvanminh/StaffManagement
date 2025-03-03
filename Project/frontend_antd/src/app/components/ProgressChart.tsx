import React from 'react';
import { Flex, Progress, Card, Space } from 'antd';

const ProgressChart: React.FC = () => (
    <Flex gap="middle" wrap>
        <Card title="Active Users" style={{ width: 300 }}>
            <Progress type="circle" percent={80} format={(percent) => `${percent}`} />
        </Card>
        <Card title="Idle Users" style={{ width: 300 }}>
            <Progress type="circle" percent={15} format={(percent) => `${percent}`} />
        </Card>
        <Card title="Attended" style={{ width: 300 }}>
            <Progress type="circle" percent={95} format={(percent) => `${percent}/100`} />
        </Card>
        <Card title="Absent" style={{ width: 300 }}>
            <Progress type="circle" percent={5} format={(percent) => `${percent}`} />
        </Card>
        <Card title="Turnover" style={{ width: 300 }}>
            <Progress type="circle" percent={5} format={(percent) => `${percent}`} />
        </Card>
        <Card title="New Hires" style={{ width: 300 }}>
            <Progress type="circle" percent={15} format={(percent) => `${percent}`} />
        </Card>
        <Card title="Overtime Hours" style={{ width: 300 }}>
            <Progress type="circle" percent={176} format={() => '176'} />
        </Card>
        <Card title="Contracts Expiring" style={{ width: 300 }}>
            <Progress type="circle" percent={5} format={(percent) => `${percent}`} />
        </Card>
        <Card title="Open Jobs" style={{ width: 300 }}>
            <Progress type="circle" percent={7} format={(percent) => `${percent}`} />
        </Card>
        <Card title="Reports" style={{ width: 300 }}>
            <Progress type="circle" percent={18} format={(percent) => `${percent}`} />
        </Card>
    </Flex>
    
);

export default ProgressChart;