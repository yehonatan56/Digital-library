import React from 'react';
import NavbarComp from '../navbar/navbar.tsx';
import { apiCall, TasksServer } from '../../tasksServer.tsx';

function Header({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <TasksServer />
            <NavbarComp />
            <button onClick={() => apiCall('test', null).then((res) => console.log(res))}>Test API</button>
            <main>{children}</main>
        </div>
    );
}

export default Header;
