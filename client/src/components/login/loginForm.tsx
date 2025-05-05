import { useState } from 'react';
import { handleLogin } from '../../logic/auth.logic.ts';
import './login.css';

export default function LoginForm({ type }: { type: 'user' | 'organization' }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    return (
        <div className="login-form-container">
            <h1>Login as {type}</h1>
            <form onSubmit={(e) => handleLogin(e, type, username, password, setError)} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
}
