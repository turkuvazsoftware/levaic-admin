import IndexLayout from "../layout/indexLayout";
import SimpleLayout from "../layout/simple";

import Index from "../views/index";
import Consultant from "../views/consultant";
import Appointment from "../views/appointment";
import Clinic from "../views/clinic";
import User from "../views/user";
import Blog from "../views/blog";
import Profile from "../views/profile";
import Login from "../views/auth/login";
import Category from "../views/category";
import Tag from "../views/tag";
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
                    <PrivateRoute roles={['admin', 'consultant', 'clinic']}>
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
                    <PrivateRoute roles={['admin', 'clinic']}>
                        <Consultant />
                    </PrivateRoute>
                )
            },
            {
                path: 'blog',
                element: (
                    <PrivateRoute roles={['admin', 'consultant', 'clinic']}>
                        <Blog />
                    </PrivateRoute>
                )
            },
            {
                path: 'profile',
                element: (
                    <PrivateRoute roles={['admin', 'consultant', 'clinic']}>
                        <Profile />
                    </PrivateRoute>
                )
            },
            {
                path: 'user',
                element: (
                    <PrivateRoute roles={['admin']}>
                        <User />
                    </PrivateRoute>
                )
            },
            {
                path: 'category',
                element: (
                    <PrivateRoute roles={['admin']}>
                        <Category />
                    </PrivateRoute>
                )
            },
            {
                path: 'tag',
                element: (
                    <PrivateRoute roles={['admin']}>
                        <Tag />
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