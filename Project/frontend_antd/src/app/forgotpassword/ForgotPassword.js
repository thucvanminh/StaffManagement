/* frontend/src/app/componeents/assets/ForgotPassword.js */

import Link from 'next/link';
import styles from './ForgotPassword.css';
export default function ForgotPassword() {
    return (
        <div className="forgot-password-container">
            <div className="forgot-password-box">
                <h1>TH</h1>
                <p>Forgot Password?</p>
                <form>
                    <label>
                        <input type="email" placeholder="Enter your email" />
                    </label>
                    <button type="submit" className="reset-button">Reset Password</button>
                </form>
                <p className="back-login">
                    <Link href="/login">Back to login</Link>
                </p>
            </div>
        </div>
    );
}