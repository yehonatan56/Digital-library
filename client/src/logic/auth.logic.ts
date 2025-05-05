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
    } catch (err) {
        setError('Invalid username or password');
    }
};
