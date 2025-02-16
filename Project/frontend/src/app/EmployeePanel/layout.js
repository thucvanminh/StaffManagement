import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import styles from './EmployeePanel.css';

export default function EmployeePanelLayout({ children }) {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <Sidebar />
                <div className={styles.mainContent}>
                    {children}
                </div>
            </div>
        </div>
    );
}