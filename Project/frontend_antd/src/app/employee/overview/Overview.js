import React from 'react';
import style from './Overview.module.css';
import Calendar from '../Calendar';

export default function OverviewPage() {
  return (
    <div>
      <h1>Employee Overview</h1>
      <p>Welcome to the Employee Overview page!</p>
      <div className='Calendar-Container'>
        <Calendar />
      </div>
    </div>
  );
}