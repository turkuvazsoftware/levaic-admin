import IndexLayout from "../layout/indexLayout";
import SimpleLayout from "../layout/simple";

import Index from "../views/index";
import Consultant from "../views/consultant";
import Appointment from "../views/appointment";
import Clinic from "../views/clinic";
import Blog from "../views/blog";
import Profile from "../views/profile";
import Login from "../views/auth/login";
import Maintenance from "../views/errors/maintenance";
import Error404 from "../views/errors/error404";
import Error500 from "../views/errors/error500";

import PrivateRoute from "../components/PrivateRoute";

export const IndexRouter = [
    {
        path: '',
        element: <IndexLayout />,
        children: [
            {
                path: '',
                element: (
                    <PrivateRoute roles={['admin', 'consultant']}>
                        <Index />
                    </PrivateRoute>
                )
            },
            {
                path: 'appointment',
                element: (
                    <PrivateRoute roles={['admin', 'consultant']}>
                        <Appointment />
                    </PrivateRoute>
                )
            },
            {
                path: 'clinic',
                element: (
                    <PrivateRoute roles={['admin']}>
                        <Clinic />
                    </PrivateRoute>
                )
            },
            {
                path: 'consultant',
                element: (
                    <PrivateRoute roles={['admin']}>
                        <Consultant />
                    </PrivateRoute>
                )
            },
            {
                path: 'blog',
                element: (
                    <PrivateRoute roles={['admin', 'consultant']}>
                        <Blog />
                    </PrivateRoute>
                )
            },
            {
                path: 'profile',
                element: (
                    <PrivateRoute roles={['admin', 'consultant']}>
                        <Profile />
                    </PrivateRoute>
                )
            }
        ]
    },
    {
        path: '/',
        element: <SimpleLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'errors/maintenance',
                element: <Maintenance />
            },
            {
                path: 'errors/error404',
                element: <Error404 />
            },
            {
                path: 'errors/error500',
                element: <Error500 />
            },
            {
                path: '*',
                element: <Error404 />
            }
        ]
    },
    {
        path: '*',
        element: <Error404 />
    }
];  