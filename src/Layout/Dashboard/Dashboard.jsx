import { Link, NavLink, Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Pages/Provider/AuthProvider";
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { Helmet } from "react-helmet";
const Dashboard = () => {

  const {user} = useContext(AuthContext);

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {isError, error, isPending, data: allUsers} = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/user')
      return res.data
    }
  })

  if (isPending) {
    return <div className="mx-auto container flex justify-center"><span className="loading loading-dots loading-lg"></span></div>;
  }

  // console.log(allUsers)
  const admin = allUsers.filter(users => users.role === 'admin');
  const isAdmin = user?.email === admin[0].email;

  const volunteer = allUsers.filter(users => users.role === 'volunteer');
  const isVolunteer = user?.email === volunteer[0]?.email;
  

  if (isError) {
    return <p>Error: {error.message}</p>;
  }


  return (
    <div className="flex ">

      <Helmet>
        <meta charSet="utf-8" />
        <title>DashBoard - Life Stream Donate</title>

        </Helmet>
      <div className="flex">
        

      <div className="drawer lg:drawer-open">
        
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    
    
    <label htmlFor="my-drawer-2" className="btn bg-white text-black drawer-button lg:hidden"><FaBars></FaBars></label>
  
  </div> 
  <div className=" drawer-side">
    
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu gap-10 p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      {
        isAdmin ? (
          <>
          <li><NavLink to='/dashboard/admindashboard'>Admin Dashboard</NavLink></li>
          <li><NavLink to='/dashboard/allusers'>All User</NavLink></li>
          <li><NavLink to='/dashboard/alldonation'>All Blood Donation Request</NavLink></li>
          <li><NavLink to='/dashboard/contentmanagement'>Content Management</NavLink></li>
          </>
        
        )
        
        : isVolunteer ? 

        ( 
        <>
      <li><NavLink to='/dashboard/volunteerdashboard'>Volunteer Dashboard</NavLink></li>
      <li><NavLink to='/dashboard/allblooddonation'>All Blood Donation Request</NavLink></li>
      <li><NavLink to='/dashboard/contentmanagementvolunteer'>ContentManagementPage</NavLink></li>
        </>
        ) 
        : 
        (
          <>
        <li><NavLink to='/dashboard/dashhome'>DashBoard Home</NavLink></li>
      <li><NavLink to='/dashboard/profile'>User Profile</NavLink></li>
      <li><NavLink to='/dashboard/mydonation'>My Donation Request</NavLink></li>
      <li><NavLink to='/dashboard/createdonationrequest'>Create Donation Request</NavLink></li>
        </>
        ) 
    }
      
      <span className="divider">OR</span>


      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/blog'>Blog</NavLink></li>


    </ul>


  
  </div>
      </div>
      
      </div>



      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;