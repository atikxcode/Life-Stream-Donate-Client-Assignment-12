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


import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import UpdateDonationRequest from './DashBoard/DashBoardHome/UpdateDonationRequest';
import AdminHome from './DashBoard/Admin/AdminHome/AdminHome';
import AllBloodDonationRequest from './DashBoard/Volunteer/AllBloodDonationRequest/AllBloodDonationRequest';
import VolunteerHome from './DashBoard/Volunteer/VolunteerHome/VolunteerHome';
import ContentManagementVolunteer from './DashBoard/Volunteer/ContentManagementVolunteer/ContentManagementVolunteer';
import BlogEdit from './DashBoard/Admin/BlogEdit/BlogEdit';
import BlogDetails from './DashBoard/Admin/BlogDetails/BlogDetails';
import Funding from './Pages/Funding/Funding';
import Search from './Pages/Search/Search';
import Banner from './Pages/Banner/Banner';
import Feature from './Pages/Feature/Feature';
import ContactUs from './Pages/ContactUs/ContactUs';
import Footer from './Pages/Footer/Footer';

import PaymentComponent from './Pages/Payment/PaymentComponent';
import PrivateRoute from './Pages/PrivateRoutes/PrivateRoutes';
import AdminRoute from './Pages/PrivateRoutes/AdminRoute';
import VolunteerRoute from './Pages/PrivateRoutes/VolunteerRoute';
import VolunteerAdminRoute from './Pages/PrivateRoutes/VolunteerAdminRoute';
import BlogEditVolunteer from './DashBoard/Volunteer/BlogEditVolunteer/BlogEditVolunteer';
import BlogDetailsVolunteer from './DashBoard/Volunteer/BlogDetailsVolunteer/BlogDetailsVolunteer';
import ViewDetails from './Pages/ViewDetails/ViewDetails';

const queryClient = new QueryClient()




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
      },
      {
        path: 'funding',
        element: <PrivateRoute><Funding></Funding></PrivateRoute>
      },
      {
        path: 'search',
        element: <Search></Search>
      },
      {
        path: 'banner',
        element: <Banner></Banner>
      },
      {
        path: 'feature',
        element: <Feature></Feature>
      },
      {
        path: 'contactus',
        element: <ContactUs></ContactUs>
      },
      {
        path: 'footer',
        element: <Footer></Footer>
      },
     {
      path: 'payment',
      element: <PaymentComponent></PaymentComponent>
     },
     {
      path: 'details/:id',
      element: <PrivateRoute><ViewDetails></ViewDetails></PrivateRoute>,
      loader: ({params}) => fetch(`https://assignment-12-server-peach.vercel.app/donationrequest/${params?.id}`)
     }
      

      
      
    ]
  },

  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      // Donor Route
      {
        path: 'dashhome',
        element: <PrivateRoute><DashBoardHome></DashBoardHome> </PrivateRoute>
      },
      {
        path: 'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: 'mydonation',
        element: <PrivateRoute><MyDonation></MyDonation></PrivateRoute>
      },
      {
        path: 'createdonationrequest',
        element: <PrivateRoute><CreateDonationRequest></CreateDonationRequest></PrivateRoute>
      },

      {
        path: 'updatedonationrequest/:id',
        element: <UpdateDonationRequest></UpdateDonationRequest>,
        loader: ({params}) => fetch(`https://assignment-12-server-peach.vercel.app/donationrequest/${params.id}`)
      },

      // Admin only Route
      {
        path: 'admindashboard',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: 'allusers',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: 'alldonation',
        element: <AdminRoute><AllUserDonationRequest></AllUserDonationRequest></AdminRoute>
      },
      {
        path: 'contentmanagement',
        element: <AdminRoute><ContentManagement></ContentManagement></AdminRoute>,

      },
      {
        path: 'addblogs',
        element: <AdminRoute><AddBlog></AddBlog></AdminRoute>
      },

      {
        path: 'blogdetails/:id',
        element: <AdminRoute><BlogDetails></BlogDetails></AdminRoute>,
        loader: ({params}) => fetch(`https://assignment-12-server-peach.vercel.app/blog/${params.id}`)
      },

      {
        path: 'blogEdit/:id',
        element: <AdminRoute><BlogEdit></BlogEdit></AdminRoute>,
        loader: ({params}) => fetch(`https://assignment-12-server-peach.vercel.app/blog/${params.id}`)

      },

      // Volunteer only Routes

      {
        path: 'volunteerdashboard',
        element: <VolunteerRoute><VolunteerHome></VolunteerHome></VolunteerRoute>
      },

      {
        path: 'allblooddonation',
        element: <VolunteerRoute><AllBloodDonationRequest></AllBloodDonationRequest></VolunteerRoute>
      },

      {
        path: 'contentmanagementvolunteer',
        element: <VolunteerRoute><ContentManagementVolunteer></ContentManagementVolunteer></VolunteerRoute>

      },
      {
        path: 'blogeditvolunteer/:id',
        element: <VolunteerRoute><BlogEditVolunteer></BlogEditVolunteer></VolunteerRoute>,
        loader: ({params}) => fetch(`https://assignment-12-server-peach.vercel.app/blog/${params.id}`)
      },

      {
        path: 'blogdetailsvolunteer/:id',
        element: <VolunteerRoute><BlogDetailsVolunteer></BlogDetailsVolunteer></VolunteerRoute>,
        loader: ({params}) => fetch(`https://assignment-12-server-peach.vercel.app/blog/${params.id}`)
        
      }

    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      
    <RouterProvider router={router} />

    </AuthProvider>
    </QueryClientProvider>

  </React.StrictMode>,
)
