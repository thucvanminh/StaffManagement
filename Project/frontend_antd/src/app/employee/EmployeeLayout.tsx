'use client'; // Thêm dòng này

import React from 'react';
import Link from 'next/link';
import {
  AppstoreOutlined,
  CalendarOutlined,
  UsergroupAddOutlined,
  ClockCircleOutlined,
  CarOutlined,
  SettingOutlined,
  CloseCircleOutlined,
  FormOutlined,
} from '@ant-design/icons'; import { Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const items = [
  { key: '1', icon: <ClockCircleOutlined />, label: <Link href="/employee/overtime">Overtime</Link> },
  { key: '2', icon: <CarOutlined />, label: <Link href="/employee/business-trip">Business Trip</Link> },
  { key: '3', icon: <CalendarOutlined />, label: <Link href="/employee/leave">Leave</Link> },
  { key: '4', icon: <CloseCircleOutlined />, label: <Link href="/employee/resign">Resign</Link> },
  { key: '5', icon: <FormOutlined />, label: <Link href="/employee/report">Report</Link> },
  { key: '6', icon: <SettingOutlined />, label: <Link href="/employee/setting">Setting</Link> },
];

const EmployeeLayout = ({ children }) => {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer, borderRadius: borderRadiusLG }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Thuc&Hieu Design ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default EmployeeLayout;