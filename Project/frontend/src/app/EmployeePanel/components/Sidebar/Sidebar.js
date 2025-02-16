import Link from 'next/link';
import styles from './Sidebar.module.css';

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <h2>Menu</h2>
            <ul>
                <li><Link href="/EmployeePanel/overview">Overview</Link></li>
                <li><Link href="/EmployeePanel/activity-feed">Activity Feed</Link></li>
                <li><Link href="/EmployeePanel/business-trip">Business Trip</Link></li>
                <li><Link href="/EmployeePanel/employee-form">Employee Form</Link></li>
                <li><Link href="/EmployeePanel/meetings">Meetings</Link></li>
                <li><Link href="/EmployeePanel/overtime">Overtime</Link></li>
            </ul>
        </aside>
    );
}