import {createBrowserRouter } from 'react-router-dom'


import ErrorPage from '../Pages/ErrorPage'
import Main from '../Components/Main/Main'
import Home from '../Components/Home/Home'
import Login from '../Components/login-Register/Login'
import Register from '../Components/login-Register/Register'
import AddVolunteerPost from '../Pages/AddVolunteerPost'
import AllPosts from '../Pages/AllPosts'
import MyPosts from '../Pages/MyPosts'
import MyRequest from '../Pages/MyRequest'
import VolunteerRequests from '../Pages/VolunteerRequests'
import NeedVolunteerDetails from './../Pages/NeedVolunteerDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/add-volunteer-post',
        element: <AddVolunteerPost />,
      },
      {
        path: '/all-posts',
        element: <AllPosts />,
      },
      {
        path: '/detailsPage/:id',
        element: <NeedVolunteerDetails />,
        loader: ({ params }) => fetch(`https://assignment-11-server-side-navy.vercel.app/detailsPage/${params.id}`),
      }
      ,
      
      {
        path: '/my-posts',
        element: <MyPosts />,
      },
      {
        path: '/my-request',
        element: <MyRequest />,
      },
      {
        path: '/volunteer-requests',
        element: <VolunteerRequests />,
      },
    ],
  },
]);

export default router