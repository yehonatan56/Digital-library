import { useState } from 'react';
import { apis } from './apiConfig.ts';
import Task from './task.tsx';
import './tasksServer.css';

export function TasksServer() {
    const [showTasks, setShowTasks] = useState(false);

    return (
        <>
            <button onClick={() => setShowTasks(!showTasks)}>Toggle Tasks</button>
            {showTasks && (
                <div id="tasks-container">
                    <h1>Tasks</h1>

                    {apis.map((api) => (
                        <Task api={api} key={api.name} />
                    ))}
                </div>
            )}
        </>
    );
}
