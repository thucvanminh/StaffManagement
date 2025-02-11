import React from 'react';
import styles from './ActivityFeed.css';

export default function ActivityFeed() {
    return (
        <div className={styles.activityFeed}>
            <h2>Activity Feed</h2>
            <ul>
                <li>Main Thuc applied for the job Frontend Engineer</li>
                <li>Anh Hieu applied for the job Product Designer</li>
            </ul>
        </div>
    );
}