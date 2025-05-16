// @ts-expect-error this is a custom hook that is not typed
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
