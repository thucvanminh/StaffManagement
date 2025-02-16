import React from 'react';

import styles from './Meetings.module.css';

export default function Meetings() {
    return (
        <div className={styles.meetings}>
            <h2>Meetings</h2>
            <ul>
                <li>
                    <strong>Mon 9</strong> | Interview<br />
                    9:00 am - 11:30 am
                </li>
                <li>
                    <strong>Thu 12</strong> | Organizational meeting<br />
                    9:00 am - 11:30 am
                </li>
                <li>
                    <strong>Fri 20</strong> | Meeting with the manager<br />
                    9:00 am - 11:30 am
                </li>
            </ul>
            <button className={styles.createButton}>Create New</button>
        </div>
    );
}