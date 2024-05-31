
import { Link, NavLink } from 'react-router-dom';

import './NavBar.css'
import 'animate.css';
import useAuth from '../../Hooks/useAuth';

const NavBar = () => {

  const {user , logOut} = useAuth;
  

  const handleSignOut = () => {
    logOut()
    .then()
    .catch()
  }

  const navLinks = <>
  <li><NavLink to='/'>Home</NavLink></li>
  
     <li><NavLink to='donationrequest'>Donation Request</NavLink></li>
    
  <li><NavLink to='blog'>Blog</NavLink></li>
 
  

  
  </>
  return (
    <div className="pb-10 pt-8 " data-aos="fade-down" data-aos-easing="linear" data-aos-duration="800">
    <div className="container mx-auto ">
    <div className="navbar ">
 <div className="navbar-start">
   <div className="dropdown">
     <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
     </div>
     <ul tabIndex="0" className=" menu menu-sm dropdown-content mt-3 z-20 p-2 shadow  rounded-box w-52 bg-inherit font-semibold text-white">
       
       {navLinks}
     </ul>
   </div>
   <h2 className="font-bold  md:text-2xl lg:text-2xl xl:text-2xl text-orange-400 animate__animated animate__backInLeft">Hello World</h2>
 </div>
 <div className="navbar-center hidden lg:flex ">
 <ul className=" menu menu-horizontal px-1 font-semibold text-white ">
     
 {navLinks}
   </ul>
 </div>



 <div className="navbar-end gap-4">
 <div className="avatar">
   {user && (
      <div className="w-12 rounded-full ">
      <img src={user.photoURL}/>
      <span className="tooltip">
       {user.displayName}
       </span> 
    </div>
   )}
    
</div>
   {
     user ? 
     <button  className="btn bg-gray-400 bg-opacity-70  border-0 text-white hover:text-black hover:bg-white duration-700" onClick={handleSignOut}>Sign Out</button>
     : <Link to='login'><button className="btn bg-gray-400 bg-opacity-70  border-0 text-white hover:text-black hover:bg-white duration-700">Login</button></Link> 
     
   }

<label className="cursor-pointer grid place-items-center">
 <input  type="checkbox" value="synthwave" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"/>
 <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
 <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
</label>
   
 </div>


</div>
    </div>
   </div>
  );
};

export default NavBar;