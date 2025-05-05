import { ApiRequest } from './apiTypes';
import { apis } from './apiConfig';

const API_URL = 'http://localhost:3000'; // Replace with your API URL

type ApiNames = (typeof apis)[number]['name'];

export const apiCall = async (
    name: ApiNames,
    params: Record<string, any> | null,
    body: Record<string, any> | null,
    headers: Record<string, any> | null
) => {
    const api = apis.find((api) => api.name === name);
    if (!api) {
        console.log(`API ${name} not found`);
        throw new Error(`API ${name} not found`);
    }
    return await request(api, params, body, headers);
};

let res: Response;
export function parseResponse(response: Response, type: string = 'json') {
    res = response;
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

const defaultApiOptionalsValues = {
    params: {},
    headers: {
        'Content-Type': 'application/json',
    },
    body: {},
};

export const request = async (
    apiRequest: ApiRequest,
    params: Record<string, any> | null,
    body: Record<string, any> | null,
    headers: Record<string, any> | null
) => {
    const requestData: ApiRequest = {
        ...apiRequest,
        params: params ?? defaultApiOptionalsValues.params,
        headers: headers ?? defaultApiOptionalsValues.headers,
        body: body ?? defaultApiOptionalsValues.body,
    };
    console.log(requestData.body);

    if (!requestData.status) {
        console.log(`API ${requestData.name} is disabled`);
        throw new Error(`API ${requestData.name} is disabled`);
    }

    let url = `${API_URL}${requestData.url}`;

    if (requestData.params && Object.keys(requestData.params).length > 0) {
        const paramsString = new URLSearchParams(requestData.params).toString();
        url += `?${paramsString}`;
    }

    const options: RequestInit = {
        method: requestData.method,
        headers: requestData.headers,
        body: requestData.body && requestData.method !== 'GET' ? JSON.stringify(requestData.body) : null,
    };

    return fetch(url, options)
        .then((response) => parseResponse(response, requestData.responseType || 'json'))
        .then((data) => {
            // @ts-ignore
            if (requestData.errorResponseStatus && res.status === requestData.errorResponseStatus) {
                console.error('Error response:', data);
                throw new Error(`Error: ${data.status}`);
            }
            return data;
        })
        .catch((error) => {
            console.error('API call failed:', error);
            throw error;
        });
};
