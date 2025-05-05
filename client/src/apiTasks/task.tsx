import { useState } from 'react';
import { ApiRequest } from './apiTypes.ts';

export default function Task({ api }: { api: ApiRequest }) {
    const [moreInfo, setMoreInfo] = useState(false);
    return (
        <div className="task">
            <h2>{api.name}</h2>
            <p>{api.description}</p>
            <p>{api.status ? 'Created' : 'Not Created'}</p>
            {moreInfo && (
                <div className="more-info">
                    <h3>Request</h3>
                    <p>URL: {api.url}</p>
                    <p>Params: {JSON.stringify(api.params, null, 2)}</p>
                    <p>Method: {api.method}</p>
                    <p>Body: {JSON.stringify(api.body, null, 2)}</p>
                    <p>Good Response: {JSON.stringify(api.goodResponse, null, 2)}</p>
                    <p>Error Response: {JSON.stringify(api.errorResponse, null, 2)}</p>
                    <p>Good Response Status: {api.goodResponseStatus}</p>
                    <p>Error Response Status: {api.errorResponseStatus}</p>
                    <button onClick={() => setMoreInfo(false)}>Close</button>
                </div>
            )}
            <button onClick={() => setMoreInfo(!moreInfo)}>{moreInfo ? 'Less Info' : 'More Info'}</button>
        </div>
    );
}
