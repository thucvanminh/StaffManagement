import React from 'react';
import { fetchEmployeeInfo } from '../../services/api'; // Import API call
import styles from './Notice.module.css';

export default function Notice() {
    const [employee, setEmployee] = useState(null); // State lưu thông tin Employee
    const [error, setError] = useState(null); // State lưu thông báo lỗi (nếu có)

    useEffect(() => {
        // Hàm lấy thông tin Employee
        const getEmployee = async () => {
            try {
                const employeeData = await fetchEmployeeInfo(); // Gọi API
                setEmployee(employeeData); // Lưu thông tin Employee vào state
            } catch (err) {
                setError(err.message); // Xử lý lỗi nếu API thất bại
            }
        };

        getEmployee(); // Gọi hàm khi component được mount
    }, []);

    // Hiển thị thông báo lỗi (nếu có)
    if (error) {
        return <div className={styles.notice}>Error: {error}</div>;
    }


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