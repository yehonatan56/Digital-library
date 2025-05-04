export type ApiRequest = {
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

export type ApiResponse<T> = {
    status: number;
    data: T;
};
