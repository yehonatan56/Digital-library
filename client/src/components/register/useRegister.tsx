import { useState } from 'react';

export default function useRegister() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    return {
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
    };
}
