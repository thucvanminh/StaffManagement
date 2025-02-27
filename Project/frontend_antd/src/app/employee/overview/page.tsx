// src/app/components/sections/employee/overview/page.tsx
'use client';

import MenuItem from './MenuItem';
// import './Overview.css'; // Nhập CSS để định dạng layout

export default function OverviewPage() {
  return (
    <div>
      <div className="contentWrapper">
        <div className='MenuContent'>
          <MenuItem />
        </div>
      </div>
    </div>
  );
}