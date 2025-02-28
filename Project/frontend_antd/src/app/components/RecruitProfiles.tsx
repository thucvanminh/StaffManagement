import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';

const data = Array.from({
  length: 16,
}).map((_, i) => ({
  href: 'https://ant.design',
  title: `CV ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    'Frontend, Backend, Fullstack.',
  content:
    'Im looking for a job as a developer. I have experience in frontend, backend and fullstack development. I have worked with React, Angular, Node, Express, MongoDB, MySQL, and more.',
}));
// const IconText = ({  }) => (
//   <Space>
//     {React.createElement(icon)}
//     {text}
//   </Space>
// );
const RecruitProfiles = () => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 4,
    }}
    dataSource={data}
    footer={
      <div>
      </div>
    }
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <StarOutlined />,
          <LikeOutlined />,
          <MessageOutlined />,
          // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={250}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
);
export default RecruitProfiles;