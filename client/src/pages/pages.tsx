import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from '../components/header/header.tsx';

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
        path: '/register',
        element: (
            <Header>
                <Register />
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

function Login() {
    return <div>Login</div>;
}

function Register() {
    return <div>Register</div>;
}

function Home() {
    return <div>Home</div>;
}
