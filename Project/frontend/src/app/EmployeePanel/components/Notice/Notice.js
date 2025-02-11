import styles from './Notice.css';

export default function Notice() {
    return (
        <div className={styles.notice}>
            <h2>Notices</h2>
            <ul>
                <li>
                <span>05 Jan</span> Annual Retreat - Announcement concerning the public holidays...{' '}
                <a href="#">Details</a>
            </li>
            <li>
                <span>05 Jan</span> Annual Retreat - Announcement concerning the public holidays...{' '}
                <a href="#">Details</a>
            </li>
            <li>
                <span>05 Jan</span> Annual Retreat - Announcement concerning the public holidays...{' '}
                <a href="#">Details</a>
            </li>
            </ul>
        </div>
    );
}