import { ApiRequest } from './apiTypes.ts';

export const apis = [
    {
        name: 'login',
        description: 'Login to the application organization or user',
        url: '/login',
        status: false,
        params: null,
        method: 'POST',
        body: {
            username: 'string',
            password: 'string',
        },
        goodResponse: {
            status: 200,
            data: {
                token: 'string',
                user: {
                    id: 'string',
                    username: 'string',
                    email: 'string',
                },
            },
        },
        errorResponse: {
            status: 401,
            data: {
                message: 'Invalid username or password',
            },
        },
    },
    {
        name: 'register',
        description: 'Register a new user',
        url: '/register',
        status: true,
        params: null,
        method: 'POST',
        body: {
            username: 'string',
            password: 'string',
            email: 'string',
        },
        goodResponse: {
            status: 201,
            data: {
                message: 'User created successfully',
                user: {
                    id: 'string',
                    username: 'string',
                    email: 'string',
                },
            },
        },
        errorResponse: {
            status: 400,
            data: {
                message: 'User already exists',
            },
        },
    },
] as const satisfies ReadonlyArray<ApiRequest>;
