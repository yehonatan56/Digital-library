// import 'react';
// @ts-ignore
import useMobileDetect from 'use-mobile-detect-hook';
import LoginForm from './loginForm';
import './login.css';

export default function Login() {
    const detectMobile = useMobileDetect();

    return (
        <div className="login-container">
            <h1>Login</h1>
            <div className="login-form" style={{ flexDirection: detectMobile.isMobile() ? 'column' : 'row' }}>
                <LoginForm type="user" />
                <LoginForm type="organization" />
            </div>
        </div>
    );
}
