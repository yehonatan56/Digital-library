import { useState } from 'react';
import './tasksServer.css';

// TS interface,function, etc. for the logic
const API_URL = 'http://localhost:3000/api'; // Replace with your API URL
type ApiRequest = {
    name: string;
    description: string;
    url: string;
    status: boolean; // if the request is created
    params?: Record<string, string> | null;
    method: string;
    headers?: Record<string, any>;
    body?: Record<string, any>;
    goodResponse: Record<string, any>;
    errorResponse: Record<string, any>;
};

type ApiResponse<T> = {
    status: number;
    data: T;
};

const defaultApiOptionalsValues = {
    params: {},
    headers: {
        'Content-Type': 'application/json',
    },
    body: {},
};

const request = async (apiRequest: ApiRequest) => {
    const requestData = {
        ...defaultApiOptionalsValues,
        ...apiRequest,
    } as ApiRequest;
    console.log('Request Data:', requestData);
    if (requestData.params) {
        const params = new URLSearchParams(requestData.params).toString();
        requestData.url = `${requestData.url}?${params}`;
    }
    if (!requestData.status) return { status: 500, data: 'Request not created' } as unknown as ApiResponse<null>;

    await fetch(API_URL + requestData.url, {
        method: requestData.method,
        headers: requestData.headers,
        body: JSON.stringify(requestData.body),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            return {
                status: 200,
                data,
            } as ApiResponse<typeof data>;
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
            return {
                status: 500,
                data: error,
            } as ApiResponse<typeof error>;
        });
};

const apis: ApiRequest[] = [
    {
        name: 'login',
        description: 'Login to the application organization or user',
        url: '/login',
        status: true,
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
    } as const,

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
    } as const,
    {
        name: 'login',
        description: 'Login to the application organization or user',
        url: '/login',
        status: true,
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
] 

type apiNames = (typeof apis)[number]['name'];
export const apiCall = async (apiName: apiNames, body: object, params?: Record<string, string> | null = null) => {
    const api = apis.find((api) => api.name === apiName);
    if (!api) {
        throw new Error(`API ${apiName} not found`);
    }
    return await request({ ...api, body, params });
};
apiCall('l', { username: 'test', password: 'test' }, { test: 'test' });
export function TasksServer() {
    const [showTasks, setShowTasks] = useState(false);
    const [moreInfo, setMoreInfo] = useState(false);
    return (
        <>
            <button onClick={() => setShowTasks(!showTasks)}>Toggle Tasks</button>
            {showTasks && (
                <div id="tasks-container">
                    <h1>Tasks</h1>

                    {apis.map((api) => (
                        <div key={api.name} className="task">
                            <h2>{api.name}</h2>
                            <p>{api.description}</p>
                            <p>{api.status ? 'Created' : 'Not Created'}</p>
                            {moreInfo && (
                                <div>
                                    <h3>Request</h3>
                                    <p>URL: {api.url}</p>
                                    <p>Params: {JSON.stringify(api.params, null, 2)}</p>
                                    <p>Method: {api.method}</p>
                                    <p>Body: {JSON.stringify(api.body, null, 2)}</p>
                                    <p>Good Response: {JSON.stringify(api.goodResponse, null, 2)}</p>
                                    <p>Error Response: {JSON.stringify(api.errorResponse, null, 2)}</p>
                                </div>
                            )}
                            <button onClick={() => setMoreInfo(!moreInfo)}>
                                {moreInfo ? 'Less Info' : 'More Info'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
