import React from 'react';
import NavbarComp from '../navbar/navbar.tsx';
import { apiCall, TasksServer } from '../../tasksServer.tsx';

function Header({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <TasksServer />
            <NavbarComp />
            <main>{children}</main>
        </div>
    );
}

export default Header;
