import { handleRegisterUser } from '../../logic/auth.logic.ts';
import './register.css';
import useRegister from './useRegister.tsx';

export default function RegisterUser({ onlyUser }: { onlyUser?: boolean }) {
    const {
        name,
        setName,
        username,
        setUsername,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        phone,
        setPhone,
        error,
        setError,
    } = useRegister();
    return (
        <div className={onlyUser ? 'register-form-container' : 'register-user-for-create-organization'}>
            <h1>Register user</h1>
            <form
                onSubmit={(e) =>
                    onlyUser
                        ? handleRegisterUser(e, { name, username, password, confirmPassword, phone }, setError)
                        : null
                }
                className="mt-4"
            >
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
                {onlyUser && (
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                )}
            </form>
        </div>
    );
}
