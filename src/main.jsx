import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Layout/Root'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import DonationRequest from './Pages/DonationRequest/DonationRequest';
import Blog from './Pages/Blog/Blog';
import AuthProvider from './Pages/Provider/AuthProvider';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import NavBar from './Pages/NavBar/NavBar';
import Home from './Pages/Home/Home';
import Dashboard from './Layout/Dashboard/Dashboard';
import Profile from './DashBoard/Profile/Profile'
import DashBoardHome from './DashBoard/DashBoardHome/DashBoardHome';
import MyDonation from './DashBoard/MyDonation/MyDonation';
import CreateDonationRequest from './DashBoard/CreateDonationRequest/CreateDonationRequest';
import AllUsers from './DashBoard/Admin/AllUsers/AllUsers';
import AllUserDonationRequest from './DashBoard/Admin/AllUserDonationRequest/AllUserDonationRequest';
import ContentManagement from './DashBoard/Admin/ContentManagement/ContentManagement';
import AddBlog from './DashBoard/Admin/AddBlog/AddBlog';






const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/navbar',
        element: <NavBar></NavBar>
      },
      {
        path: 'donationrequest',
        element: <DonationRequest></DonationRequest>
      },
      {
        path: 'blog',
        element: <Blog></Blog>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      }
    ]
  },

  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      // Donor Route
      {
        path: 'dashhome',
        element: <DashBoardHome></DashBoardHome> 
      },
      {
        path: 'profile',
        element: <Profile></Profile>
      },
      {
        path: 'mydonation',
        element: <MyDonation></MyDonation>
      },
      {
        path: 'createdonationrequest',
        element: <CreateDonationRequest></CreateDonationRequest>
      },

      // Admin only Route
      {
        path: 'allusers',
        element: <AllUsers></AllUsers>
      },
      {
        path: 'alldonation',
        element: <AllUserDonationRequest></AllUserDonationRequest>
      },
      {
        path: 'contentmanagement',
        element: <ContentManagement></ContentManagement>,

      },
      {
        path: 'addblogs',
        element: <AddBlog></AddBlog>
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />

    </AuthProvider>
  </React.StrictMode>,
)
