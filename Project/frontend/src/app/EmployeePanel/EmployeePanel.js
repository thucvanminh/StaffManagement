import React from 'react';
import styles from './EmployeePanel.module.css';

export default function EmployeePanel({ children }) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.mainContent}>
                    {children}
                </div>
            </div>
        </div>
    );
}