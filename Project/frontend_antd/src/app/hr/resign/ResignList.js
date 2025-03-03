import React, { useState } from 'react';
import { Avatar, List, Radio, Space, Button } from 'antd';
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
const positionOptions = ['top', 'bottom', 'both'];
const alignOptions = ['start', 'center', 'end'];
const ResignList = () => {
  const [position, setPosition] = useState('bottom');
  const [align, setAlign] = useState('center');
  return (
    <>
      <Space
        direction="vertical"
        style={{
          marginBottom: '20px',
        }}
        size="middle"
      ></Space>
      
  <List
    pagination={{
      position,
      align,
    }}
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
        <Button type="primary">Approve</Button>
        <Button>Profile</Button>
      </List.Item>
    )}
  />
    </>
  );
};
export default ResignList;