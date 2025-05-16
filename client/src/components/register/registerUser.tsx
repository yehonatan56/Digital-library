import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { handleRegisterUser } from '../../logic/auth.logic.ts';
import './register.css';

type RegisterUserProps = {
    onlyUser?: boolean;
};

const RegisterUser = forwardRef(function RegisterUser(
    { onlyUser }: RegisterUserProps,
    ref: React.Ref<{ triggerSubmit: () => void }>
) {
    const [name, setName] = useState('john doe');
    const [username, setUsername] = useState('johndoe');
    const [password, setPassword] = useState('123456');
    const [confirmPassword, setConfirmPassword] = useState('123456');
    const [phone, setPhone] = useState('052123456');
    const [error, setError] = useState<string | null>(null);

    // expose triggerSubmit function to parent
    useImperativeHandle(ref, () => ({
        triggerSubmit: () => {
            return handleSubmit(new Event('submit') as any); // simulate submit event
        },
    }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!name || !username || !password || !confirmPassword || !phone) {
            setError('All fields are required');
            return false;
        }
        if (username.length < 3) {
            setError('Username must be at least 3 characters long');
            return false;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        const userData = { name, username, password, phone };
        return onlyUser ? handleRegisterUser(e, userData, setError) : userData;
    };

    return (
        <div className="register-form-container">
            <h1>Register User</h1>
            <form onSubmit={onlyUser ? handleSubmit : (e) => e.preventDefault()} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setError(null)}
                        required
                    />
                </div>
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
                        onFocus={() => setError(null)}
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
                        onFocus={() => setError(null)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setError(null)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                        Phone
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onFocus={() => setError(null)}
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {onlyUser && (
                    <button type="submit" className="btn btn-primary w-100">
                        Register
                    </button>
                )}
            </form>
        </div>
    );
});

export default RegisterUser;
//
