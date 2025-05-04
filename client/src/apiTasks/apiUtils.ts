import { ApiRequest, ApiResponse } from './apiTypes.ts';

const API_URL = 'http://localhost:3000'; // Replace with your API URL

export function parseResponse(response: Response, type = 'json') {
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

export const request = async (apiRequest: ApiRequest): Promise<ApiResponse<any>> => {
    const requestData = {
        ...defaultApiOptionalsValues,
        ...apiRequest,
    } as ApiRequest;

    console.log('Request Data:', requestData);

    if (requestData.params) {
        const params = new URLSearchParams(requestData.params).toString();
        requestData.url = `${requestData.url}?${params}`;
    }

    if (!requestData.status) {
        return { status: 500, data: 'Request not created' } as unknown as ApiResponse<null>;
    }

    let res: Response;

    return await fetch(API_URL + requestData.url, {
        method: requestData.method,
        headers: requestData.headers,
        mode: 'no-cors',
        body: requestData.body ? JSON.stringify(requestData.body) : null,
    })
        .then((response) => {
            res = response;
            return parseResponse(response, requestData.responseType || 'json');
        })
        .then((data) => {
            console.log(res);
            return {
                status: res.status,
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
