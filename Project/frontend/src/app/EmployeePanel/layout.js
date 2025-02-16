import Sidebar from './components/Sidebar/Sidebar';
import styles from './EmployeePanel.module.css';

export default function EmployeePanelLayout({ children }) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Sidebar />
                <div className={styles.mainContent}>
                    {children}
                </div>
            </div>
        </div>
    );
}