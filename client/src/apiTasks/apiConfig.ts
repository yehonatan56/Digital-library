import { ApiRequest } from './apiTypes.ts';

export const apis = [
    {
        name: 'login user',
        description: 'Login to the application organization or user',
        url: '/auth/login',
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
                },
            },
        },
        errorResponse: {
            status: 401,
            data: {
                message: 'Invalid username or password',
            },
        },
        errorResponseStatus: 401,
        goodResponseStatus: 200,
    },
    {
        name: 'login organization',
        description: 'Login to the application organization or user',
        url: '/organization/login',
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
                organization: {
                    id: 'string',
                    name: 'string',
                },
            },
        },
        errorResponse: {
            status: 401,
            data: {
                message: 'Invalid username or password',
            },
        },
        errorResponseStatus: 401,
        goodResponseStatus: 200,
    },
    {
        name: 'register user',
        description: 'Register a new user',
        url: '/auth/register',
        status: false,
        params: null,
        method: 'POST',
        body: {
            name: 'string',
            username: 'string',
            password: 'string',
            phone: 'string',
        },
        goodResponse: {
            status: 201,
            data: {
                message: 'User registered successfully',
                token: 'string',
                user: {
                    id: 'string',
                    username: 'string',
                },
            },
        },
        errorResponse: {
            status: 400,
            data: {
                message: 'User already exists or invalid data',
            },
        },
        errorResponseStatus: 400,
        goodResponseStatus: 201,
    },
] as const satisfies ReadonlyArray<ApiRequest>;
