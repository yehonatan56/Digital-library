import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { handleRegisterUser } from '../../logic/auth.logic.ts';
import './register.css';

type RegisterUserProps = {
    onlyUser?: boolean;
};

const RegisterUser = forwardRef(function RegisterUser(
    { onlyUser }: RegisterUserProps,
    ref: React.Ref<{ triggerSubmit: () => void }>
) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState<string | null>(null);

    // expose triggerSubmit function to parent
    useImperativeHandle(ref, () => ({
        triggerSubmit: () => {
            handleSubmit(new Event('submit') as any); // simulate submit event
        },
    }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        // Call the handleRegisterUser function with the form data
        // and setError to handle any errors
        onlyUser && handleRegisterUser(e, { name, username, password, confirmPassword, phone }, setError);
    };

    return (
        <div className="register-form-container">
            <h1>Register User</h1>
            <form onSubmit={handleSubmit} className="mt-4">
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
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
});

export default RegisterUser;
//
