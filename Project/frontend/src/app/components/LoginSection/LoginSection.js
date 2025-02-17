'use client'
/* frontend/src/app/componeents/assets/LoginSection.js */

import Link from 'next/link';
import  './LoginSection.css';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {login} from '../../services/authService'

export default function LoginSection() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await login(username, password); // Gọi API bằng service
            localStorage.setItem('token', data.token); // Lưu token sau khi login thành công
            router.push('/EmployeePanel/overview'); // Chuyển hướng đến EmployeePanel
            console.log('Login success!');
        } catch (err) {
            console.log('Login failed:');
            // setError(err.message); // Hiển thị lỗi nếu thất bại`
        }
    };


    return (
        <div className="login-container">
            <div className="login-box">
                <h1>TH</h1>
                <form onSubmit={handleLogin}>
                    <label>
                        <input  type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                        />
                    </label>
                    <label>
                        <input  type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                        />
                    </label>
                    <div className="form-options">
                        <input type="checkbox" id="keepSignedIn" style={{ width: '10%' }} />
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