import React from 'react';
import styles from './BusinessTripTable.module.css';

export default function BusinessTripTable() {
    return (
        <table className={styles.businessTripTable}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Request From</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>BU0001</td>
                    <td>Nguyễn Văn A</td>
                    <td>HCM City</td>
                    <td>Rejected</td>
                    <td>07:00 12/09/2024 - 17:30 28/09/2024</td>
                </tr>
                {/* Add more rows here */}
            </tbody>
        </table>
    );
}