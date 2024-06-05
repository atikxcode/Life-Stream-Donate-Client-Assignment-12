import { Link, NavLink, Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="flex ">


      <div>

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
      <li><NavLink to='/dashboard/dashhome'>DashBoard Home</NavLink></li>
      <li><NavLink to='/dashboard/profile'>User Profile</NavLink></li>
      <li><NavLink to='/dashboard/mydonation'>My Donation Request</NavLink></li>
      <li><NavLink to='/dashboard/createdonationrequest'>Create Donation Request</NavLink></li>

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