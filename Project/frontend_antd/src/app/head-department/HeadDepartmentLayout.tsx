'use client';

import React from 'react';
import Link from 'next/link';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  CarOutlined,
  SettingOutlined,
  FormOutlined,
  UserOutlined,
  UserSwitchOutlined,
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
  { key: '1', icon: <CalendarOutlined />, label: <Link href="/head-department/attendance">Attendance</Link> },
  { key: '2', icon: <ClockCircleOutlined />, label: <Link href="/head-department/overtime">Overtime</Link> },
  { key: '3', icon: <CarOutlined />, label: <Link href="/head-department/business-trip">Business Trip</Link> },
  { key: '4', icon: <RedoOutlined />, label: <Link href="/head-department/absence-management">Absence Management</Link> },
  { key: '5', icon: <UserSwitchOutlined />, label: <Link href="/head-department/transfer">Transfer</Link> },
  { key: '6', icon: <UserOutlined />, label: <Link href="/head-department/employee">Employee</Link> },
  { key: '7', icon: <FormOutlined />, label: <Link href="/head-department/report">Report</Link> },
  { key: '8', icon: <SettingOutlined />, label: <Link href="/head-department/setting">Setting</Link> },
];

const HeadDepartmentLayout = ({ children }) => {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider style={siderStyle} width={230}>
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

export default HeadDepartmentLayout;