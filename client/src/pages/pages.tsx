import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from '../components/header/header';
import Login from '../components/login/login';
import RegisterOrganization from '../components/register/registerOrganization.tsx';
import Register from '../components/register/register.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Header>
                <Home />
            </Header>
        ),
    },
    {
        path: '/login',
        element: (
            <Header>
                <Login />
            </Header>
        ),
    },
    {
        path: '/register-user',
        element: (
            <Header>
                <Register />
            </Header>
        ),
    },

    {
        path: '/register-organization',
        element: (
            <Header>
                <RegisterOrganization />
            </Header>
        ),
    },
]);

function Pages() {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default Pages;
function Home() {
    return <div>Home</div>;
}
