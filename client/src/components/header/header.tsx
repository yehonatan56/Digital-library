import React from 'react';
import NavbarComp from '../navbar/navbar.tsx';

function Header({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <NavbarComp />
            <main>{children}</main>
        </div>
    );
}

export default Header;
