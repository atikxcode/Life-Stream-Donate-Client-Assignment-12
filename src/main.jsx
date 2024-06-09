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
        element: <Funding></Funding>
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

      {
        path: 'updatedonationrequest/:id',
        element: <UpdateDonationRequest></UpdateDonationRequest>,
        loader: ({params}) => fetch(`http://localhost:5000/donationrequest/${params.id}`)
      },

      // Admin only Route
      {
        path: 'admindashboard',
        element: <AdminHome></AdminHome>
      },
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
      },

      {
        path: 'blogdetails/:id',
        element: <BlogDetails></BlogDetails>,
        loader: ({params}) => fetch(`http://localhost:5000/blog/${params.id}`)
      },

      {
        path: 'blogEdit/:id',
        element: <BlogEdit></BlogEdit>,
        loader: ({params}) => fetch(`http://localhost:5000/blog/${params.id}`)

      },

      // Volunteer only Routes

      {
        path: 'volunteerdashboard',
        element: <VolunteerHome></VolunteerHome>
      },

      {
        path: 'allblooddonation',
        element: <AllBloodDonationRequest></AllBloodDonationRequest>
      },

      {
        path: 'contentmanagementvolunteer',
        element: <ContentManagementVolunteer></ContentManagementVolunteer>

      },

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
