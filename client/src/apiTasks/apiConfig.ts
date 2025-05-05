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
    },
] as const satisfies ReadonlyArray<ApiRequest>;
