import { useState } from 'react';
import './tasksServer.css';
import { apis } from './apiConfig.ts';
import { request } from './apiUtils.ts';

type apiNames = (typeof apis)[number]['name'];

export const apiCall = async (apiName: apiNames, body: object | null, params: Record<string, string> | null = null) => {
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
