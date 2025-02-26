// src/app/components/sections/employee/overview/page.tsx
'use client';

import CalendarMenu from '../../components/CalendarMenu';
import NoticeList from '../../components/NoticeList';
import './BusinessTrip.css'; // Nhập CSS để định dạng layout

export default function BusinessTripPage() {
  return (
    <div style={{ margin: 0, padding: 0, height: '100%' }}>
      <div className="contentWrapper">
        <div className="noticeContent">
          <NoticeList />
        </div>
        <div className="calendarContent">
          <CalendarMenu />
        </div>
      </div>
    </div>
  );
}