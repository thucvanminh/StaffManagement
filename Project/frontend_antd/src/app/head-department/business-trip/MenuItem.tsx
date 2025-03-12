import React from 'react';
import { Tabs } from 'antd';
import BusinessTripTable from './BusinessTripTable';
import BusinessTripList from './BusinessTripList';

const onChange = (key: string) => {
    console.log(`Switched to tab: ${key}`);
};

const App: React.FC = () => (
    <Tabs
        onChange={onChange}
        type="card"
        items={[
            {
                label: 'Request Business Trip',
                key: '1',
                children: <BusinessTripTable />,
            },
            {
                label: 'Business Trip List',
                key: '2',
                children: <BusinessTripList />,
            },
        ]}
    />
);

export default App;