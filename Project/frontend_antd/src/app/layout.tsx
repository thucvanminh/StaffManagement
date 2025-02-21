'use client';

import React from 'react';
import { ConfigProvider } from 'antd';
import { usePathname } from 'next/navigation';
import EmployeeLayout from './employee/EmployeeLayout';

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
          ) : (
            <>{children}</>
          )}
        </ConfigProvider>
      </body>
    </html>
  );
}