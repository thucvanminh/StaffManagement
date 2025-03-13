'use client';

import React from 'react';
import { ConfigProvider } from 'antd';
import { usePathname } from 'next/navigation';
import HRLayout from './hr/HRLayout';
import EmployeeLayout from './employee/EmployeeLayout';
import HeadDepartmentLayout from './head-department/HeadDepartmentLayout';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1890ff',
            },
          }}
        >
          {pathname.startsWith('/employee') ? (
            <EmployeeLayout>{children}</EmployeeLayout>
          ) : pathname.startsWith('/hr') ? (
            <HRLayout>{children}</HRLayout>
            ) : pathname.startsWith('/head-department') ? (
            <HeadDepartmentLayout>{children}</HeadDepartmentLayout>
          ) : (
            <>{children}</>
          )}
        </ConfigProvider>
      </body>
    </html>
  );
}