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
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

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
  { key: '1', icon: <AppstoreOutlined />, label: <Link href="/employee/overview">Overview</Link> },
  { key: '2', icon: <ClockCircleOutlined />, label: <Link href="/employee/overtime">Overtime</Link> },
  { key: '3', icon: <CarOutlined />, label: <Link href="/employee/business-trip">Business Trip</Link> },
  { key: '4', icon: <CalendarOutlined />, label: <Link href="/employee/leave">Leave</Link> },
  { key: '5', icon: <CloseCircleOutlined />, label: <Link href="/employee/resign">Resign</Link> },
  { key: '6', icon: <UsergroupAddOutlined />, label: <Link href="/employee/recruit">Recruit</Link> },
  { key: '7', icon: <FormOutlined />, label: <Link href="/employee/report">Report</Link> },
  { key: '8', icon: <SettingOutlined />, label: <Link href="/employee/setting">Setting</Link> },
];

export default function EmployeeLayout({ children }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider style={{ minHeight: '100vh' }}> {/* Đảm bảo layout chiếm toàn bộ chiều cao */}
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: 0, // Loại bỏ margin để giảm khoảng trắng
            padding: 0, // Loại bỏ padding để nội dung vừa khít
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 0, // Loại bỏ padding để nội dung sát mép
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: 0, // Loại bỏ borderRadius nếu không cần
              minHeight: 'calc(100vh - 64px)', // Đảm bảo nội dung chiếm toàn bộ chiều cao còn lại (giảm chiều cao của Header)
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            padding: '8px 0', // Giảm padding của footer nếu cần
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}