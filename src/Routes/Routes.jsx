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
import Update from '../Pages/Update'
import PrivateRoute from './PrivateRoute'

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
        path: '/update/:id',
        element: <Update/>,
        loader: ({params})=> fetch(`http://localhost:5000/update/${params.id}`),
      },
      {
        path: '/add-volunteer-post',
        element: <PrivateRoute><AddVolunteerPost /></PrivateRoute>,
      },
      {
        path: '/all-posts',
        element: <AllPosts />,
      }, 
      {
        path: '/detailsPage/:id',
        element: <PrivateRoute><NeedVolunteerDetails /></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/detailsPage/${params.id}`),
      }
      ,
      
      {
        path: '/my-posts',
        element: <MyPosts />,
      },
      {
        path: '/myRequest',
        element: <MyRequest />,
        // loader: ({params})=> fetch(`http://localhost:5000/myRequest/${params.email}`)
      },
      {
        path: '/volunteer-requests',
        element: <VolunteerRequests />,
      },
    ],
  },
]);

export default router