// src/MenuItem.js
import React from 'react';
import { Tabs } from 'antd';
import AbsenceTable from './AbsenceTable';
import ResignTable from './ResignTable';
import AbsenceList from './AbsenceList';
import ResignList from './ResignList';
const onChange = (key: string) => {
  console.log(`Switched to tab: ${key}`);
};

const App: React.FC = () => (
  <Tabs
    onChange={onChange}
    type="card"
    items={[
      {
        label: 'Request Absence',
        key: '1',
        children: <AbsenceTable />,
      },
      {
        label: 'Absence List',
        key: '2',
        children: <AbsenceList />,
      },
      {
        label: 'Resign Request',
        key: '3',
        children: <ResignTable />,
      },
      {
        label: 'Resign List',
        key: '4',
        children: <ResignList />,
      },
    ]}
  />
);

export default App;