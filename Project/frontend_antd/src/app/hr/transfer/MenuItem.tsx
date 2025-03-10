import React from 'react';
import { Tabs } from 'antd';
import TransferTable from './TransferTable';
import TransferList from './TransferList';

const onChange = (key: string) => {
    console.log(`Switched to tab: ${key}`);
};

const App: React.FC = () => (
    <Tabs
        onChange={onChange}
        type="card"
        items={[
            {
                label: 'Request Transfer',
                key: '1',
                children: <TransferTable />,
            },
            {
                label: 'Transfer List',
                key: '2',
                children: <TransferList />,
            },
        ]}
    />
);
export default App;