import Link from 'next/link';
import styles from './Header.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <h1>Employee Overview</h1>
            <nav>
                <Link href="/overview">Overview</Link>
                <Link href="/overtime">Overtime</Link>
                <Link href="/business-trip">Business Trip</Link>
                <Link href="/leave">Leave</Link>
                <Link href="/resign">Resign</Link>
                <Link href="/settings">Settings</Link>
                <Link href="/report">Report</Link>
                <Link href="/logout">Logout</Link>
            </nav>
        </header>
    );
}