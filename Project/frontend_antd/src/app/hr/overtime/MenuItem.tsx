import React from 'react';
import { Tabs } from 'antd';
import OvetimeTable from './OvertimeTable';
import OvertimeList from './OvertimeList';


const onChange = (key: string) => {
    console.log(`Switched to tab: ${key}`);
};

const App: React.FC = () => (
    <Tabs
        onChange={onChange}
        type="card"
        items={[
            {
                label: 'Request Overtime',
                key: '1',
                children: <OvetimeTable />,
            },
            {
                label: 'Overtime List',
                key: '2',
                children: <OvertimeList />,
            },
        ]}
    />
);
export default App;