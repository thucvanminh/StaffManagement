/* frontend/src/app/componeents/assets/SignUpSection.js */

import Link from 'next/link';
import './SignUpSection.css';

export default function SignUpSection() {
    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form>
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email Address" />
                <input type="password" placeholder="Password" />
                <button type="submit">Sign Up</button>
            </form>
            <div className="extra-links">
                <Link href="/login">Already have an account? Sign in here</Link>
            </div>
        </div>
    );
}
