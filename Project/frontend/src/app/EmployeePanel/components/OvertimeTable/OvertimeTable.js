import React from 'react';

import styles from './OvertimeTable.module.css';

export default function OvertimeTable() {
    return (
        <table className={styles.overtimeTable}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Request From</th>
                    <th>Status</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>EM0001</td>
                    <td>28/11/2024</td>
                    <td>Nguyễn Văn A</td>
                    <td>Rejected</td>
                    <td>16:30 - 1:00</td>
                </tr>
                {/* Add more rows here */}
            </tbody>
        </table>
    );
}