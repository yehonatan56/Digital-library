import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from '../components/header/header';
import Login from '../components/login/login';
import RegisterUser from '../components/register/registerUser.tsx';
import RegisterOrganization from '../components/register/registerOrganization.tsx';

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
                <RegisterUser onlyUser />
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
