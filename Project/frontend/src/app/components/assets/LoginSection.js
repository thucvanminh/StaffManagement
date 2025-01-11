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
                        <label>
                            <input type="checkbox" /> 
                            <label>Keep me signed in</label>
                        </label>
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