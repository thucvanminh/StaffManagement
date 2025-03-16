'use client'
/* frontend/src/app/login/LoginSection.js */

import Link from 'next/link';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import styles from './LoginSection.css';

import {jwtDecode} from 'jwt-decode';
import Authentication from '../services/authentication';
import employeeService from '../services/employeeService';
export default function LoginSection() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        try {
            // Bước 1: Gọi API login
            const data = await Authentication.login(username, password);
            const token = data.token;
            localStorage.setItem('token', token);

            // Bước 2: Decode token để lấy payload
            const decodedToken = jwtDecode(token);
            const roleID = decodedToken.roleID;
            const employeeID = decodedToken.employeeID;

            // Bước 3: Xử lý logic điều hướng
            if (roleID === 1 || roleID === 2) {
                router.push('/hr/employee');
            } else if (roleID === 3) {
                try {
                    const isHeadOfDepartment = await employeeService.isHeadOfDepartment(employeeID);
                    if (isHeadOfDepartment) {
                        router.push('/headDepartment/employee');
                    } else {
                        router.push('/employee/overview');
                    }
                } catch (error) {
                    console.error('Error checking department head:', error);
                    router.push('/login'); // Điều hướng nếu lỗi
                }
            } else {
                router.push('/login'); // Mặc định
            }

            console.log('Login success!');
        } catch (err) {
            console.error('login failed:', err);
            setError('username or password is incorrect');
        }
    };


    return (
        <div className="login-container">
            <div className="login-box">
                <h1>TH</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleLogin}>
                    <label>
                        <input 
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        <input 
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <div className="form-options">
                        <input type="checkbox" id="keepSignedIn" style={{width: '10%'}}/>
                        <label htmlFor="keepSignedIn">Keep me signed in</label>
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="forgot-password">
                    <Link href="/forgotpassword">Forgot password?</Link>
                </p>
            </div>
        </div>
    );
}