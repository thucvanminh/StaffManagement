// src/app/components/sections/employee/overview/page.tsx
import CalendarMenu from '../../components/CalendarMenu';
import NoticeList from '../../components/NoticeList';
import { Calendar } from 'antd';
export default function OvertimePage() {
    return (
      <div style={{ margin: 0, padding: 0, height: '100%' }}> {/* Đảm bảo không có khoảng trắng */}
        <h1>Employee Overtime Page</h1>
        <div>
          <CalendarMenu />
          <NoticeList />
        </div>
      </div>
    );
  }