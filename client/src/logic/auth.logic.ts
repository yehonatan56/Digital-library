import { apiCall } from '../apiTasks/apiUtils.ts';

export const handleLogin = async (
    e: any,
    type: 'user' | 'organization',
    username: string,
    password: string,
    setError: any
) => {
    e.preventDefault();

    try {
        // Simulate API call
        const response = await apiCall(`login ${type}`, null, { username, password }, null);
        console.log(response);
        return response;
    } catch (_err: any) {
        setError('Invalid username or password');
    }
};

export const handleRegisterUser = async (
    e: any,
    { name, username, password, phone }: { name: string; username: string; password: string; phone: string },
    setError: any
) => {
    e.preventDefault();
    try {
        // Simulate API call
        const response = await apiCall('register user', null, { name, username, password, phone }, null);
        console.log(response);
        return response;
    } catch (_err: any) {
        setError('Registration failed');
    }
};
