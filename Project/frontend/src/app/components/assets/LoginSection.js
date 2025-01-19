import Link from 'next/link';
import './LoginSection.css';

export default function LoginSection() {
    return (
        <div className="login-container">
            <div className="login-box">
                <h1>TH</h1>
                <form>
                    <label>
                        <input type="text" placeholder="Username" />
                    </label>
                    <label>
                        <input type="password" placeholder="Password" />
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