import React from 'react';
import NavbarComp from '../navbar/navbar.tsx';
import { TasksServer } from '../../apiTasks/tasksServer.tsx';
import { apiCall } from '../../apiTasks/apiUtils.ts';

function Header({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <TasksServer />
            <NavbarComp />
            {/*<button*/}
            {/*    onClick={() => {*/}
            {/*        fetch('http://localhost:3000/auth/login?', {*/}
            {/*            method: 'POST',*/}
            {/*            headers: {*/}
            {/*                'Content-Type': 'application/json',*/}
            {/*            },*/}
            {/*            body: JSON.stringify({ username: 'admin', password: 'admin' }),*/}
            {/*        })*/}
            {/*            .then((response) => response.json())*/}
            {/*            .then((data) => console.log(data));*/}
            {/*    }}*/}
            {/*>*/}
            {/*    Te*/}
            {/*</button>*/}

            <button onClick={() => apiCall('login user', null, { username: 'admin', password: 'admin' }, null)}>
                Test API
            </button>
            <main>{children}</main>
        </div>
    );
}

export default Header;
