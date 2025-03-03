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
  UserSwitchOutlined,
  UserOutlined,
  AuditOutlined,
  RedoOutlined,
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
  { key: '1', icon: <AppstoreOutlined />, label: <Link href="/hr/overview">Overview</Link> },
  { key: '2', icon: <CalendarOutlined />, label: <Link href="/hr/attendance">Attendance</Link> },
  { key: '3', icon: <ClockCircleOutlined />, label: <Link href="/hr/overtime">Overtime</Link> },
  { key: '4', icon: <CarOutlined />, label: <Link href="/hr/business-trip">Business Trip</Link> },
  { key: '5', icon: <AuditOutlined />, label: <Link href="/hr/probationary">Probationary</Link> },
  { key: '6', icon: <RedoOutlined />, label: <Link href="/hr/leave">Leave</Link> },
  { key: '7', icon: <CloseCircleOutlined />, label: <Link href="/hr/resign">Resign</Link> },
  { key: '8', icon: <UserSwitchOutlined />, label: <Link href="/hr/transfer">Transfer</Link> },
  { key: '9', icon: <UserOutlined />, label: <Link href="/hr/employee">Employee</Link> },
  { key: '10', icon: <UsergroupAddOutlined />, label: <Link href="/hr/recruit">Recruit</Link> },
  { key: '11', icon: <FormOutlined />, label: <Link href="/hr/report">Report</Link> },
  { key: '12', icon: <SettingOutlined />, label: <Link href="/hr/setting">Setting</Link> },
];

const HRLayout = ({ children }) => {
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

export default HRLayout;