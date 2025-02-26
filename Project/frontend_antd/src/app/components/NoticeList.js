// src/app/components/NoticeList.js (hoặc vị trí tương ứng)
'use client';
import React, { useEffect, useState } from 'react';
import { Avatar, List, message, Typography } from 'antd';
import VirtualList from 'rc-virtual-list';

const fakeDataUrl = 'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 250;

const NoticeList = () => {
  const [data, setData] = useState([]);

  const appendData = (showMessage = true) => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        showMessage && message.success(`${body.results.length} more items loaded!`);
      });
  };

  useEffect(() => {
    appendData(false);
  }, []);

  const onScroll = (e) => {
    if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
      appendData();
    }
  };

  return (
    <div className="noticeWrapper">
      <div className="noticeHeader">
        <Typography.Title level={4}>Notice</Typography.Title>
      </div>
      <List style={{ margin: 0, padding: 0 }}>
        <VirtualList
          data={data}
          height={ContainerHeight}
          itemHeight={47}
          itemKey="email"
          onScroll={onScroll}
          style={{ margin: 0, padding: 0 }}
          align="left"
        >
          {(item) => (
            <List.Item key={item.email} style={{ padding: '4px 8px' }}>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
              <div>Details</div>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </div>
  );
};

export default NoticeList;