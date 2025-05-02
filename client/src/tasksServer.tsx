import { useState } from 'react';
import './tasksServer.css';

// TS interface,function, etc. for the logic
const API_URL = 'http://localhost:3000'; // Replace with your API URL
type ApiRequest = {
    name: string;
    description: string;
    url: string;
    status: boolean; // if the request is created
    params?: Record<string, string> | null;
    method: string;
    responseType?: 'json' | 'text' | 'status' | 'blob' | 'arrayBuffer' | 'formData';
    headers?: Record<string, any>;
    body?: Record<string, any> | null;
    goodResponse: Record<string, any>;
    errorResponse: Record<string, any>;
};

function parseResponse(response: Response, type = 'json') {
    switch (type) {
        case 'json':
            return response.json();
        case 'text':
            return response.text();
        case 'blob':
            return response.blob();
        case 'arrayBuffer':
            return response.arrayBuffer();
        case 'formData':
            return response.formData();
        default:
            throw new Error(`Unsupported response type: ${type}`);
    }
}

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

    return await fetch(API_URL + requestData.url, {
        method: requestData.method,
        headers: requestData.headers,
        mode: 'no-cors',
        body: requestData.body ? JSON.stringify(requestData.body) : null,
    })
        .then((response) => parseResponse(response, requestData.responseType || 'json'))
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

const apis = [
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

    {
        name: 'test',
        description: 'Test the API',
        url: '/',
        status: true,
        params: null,
        method: 'GET',
        responseType: 'text',
        body: null,
        goodResponse: {
            status: 200,
            data: {
                message: 'OK',
            },
        },
        errorResponse: {
            status: 500,
            data: {
                message: 'Internal Server Error',
            },
        },
    },
] as const satisfies ReadonlyArray<ApiRequest>;

type apiNames = (typeof apis)[number]['name'];
export const apiCall = async (
    apiName: apiNames,
    body: object | null,
    params?: Record<string, string> | null = null
) => {
    const api = apis.find((api) => api.name === apiName);
    if (!api) {
        throw new Error(`API ${apiName} not found`);
    }
    return await request({ ...api, body, params });
};
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
