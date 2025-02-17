import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';
import 'animate.css';
import { useTypewriter } from 'react-simple-typewriter';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const NavBar = () => {
  const { user, logOut, theme, setTheme } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');
    document.querySelector('html').setAttribute('data-theme', localTheme);
  }, [theme]);

  const handleToggleTheme = (e) => {
    if (e.target.checked) {
      setTheme('black');
    } else {
      setTheme('light');
    }
  };

  const [typeEffect] = useTypewriter({
    words: ['Life Stream Donate'],
    loop: {},
    typeSpeed: 110,
    deleteSpeed: 40
  });

  const handleSignOut = () => {
    logOut().then().catch();
  };

  // Query to get user details
  const { data: userDetails, isLoading } = useQuery({
    queryKey: ['userDetails'],
    queryFn: async () => {
      const res = await axiosPublic.get('/user');
      return res.data;
    }
  });

  // Filter to get current user details
  const currentUser = userDetails?.find(userDetail => userDetail?.email === user?.email);

  useEffect(() => {
    if (currentUser) {
      console.log('Current User:', currentUser);
    }
  }, [currentUser]); // Only log currentUser when it changes


  const navLinks = <>
  <li className={theme === 'light' ? "text-black" : "text-white"}><NavLink to='/'>Home</NavLink></li>
  
     <li className={theme === 'light' ? "text-black" : "text-white"}><NavLink to='/donationrequest'>Donation Request</NavLink></li>
    
  <li className={theme === 'light' ? "text-black" : "text-white"}><NavLink to='/blog'>Blog</NavLink></li>
  {
    user &&  <li className={theme === 'light' ? "text-black" : "text-white"}><NavLink to='/funding'>Funding</NavLink></li>
  }

  </>
  return (
    <div className="pb-10 pt-8">
    <div className="container mx-auto ">
    <div className="navbar ">
 <div className="navbar-start">
   <div className="dropdown">
     <div tabIndex={0} role="button" className={`btn btn-ghost lg:hidden ${theme === 'light' ? 'text-black' : 'text-white'}`}>
       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
     </div>
     <ul tabIndex="0" className={` menu menu-sm dropdown-content mt-3 z-20 p-2 shadow  rounded-box w-52 bg-inherit font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>
       
       {navLinks}
     </ul>
   </div>
 <Link to='/'>
 <div className="flex items-center gap-4">
  {/* <img className="h-[60px] w-[60px] rounded-[50%] hidden md:block lg:block xl:block"  alt="" /> */}
   <h2 className="font-bold  md:text-2xl lg:text-xl xl:text-xl text-red-600 ">{typeEffect}</h2>
  </div>
 </Link>
 </div>
 <div className="navbar-center hidden lg:flex ">
 <ul className=" menu menu-horizontal px-1 font-semibold text-white ">
     
 {navLinks}
   </ul>
 </div>



 <div className="navbar-end gap-4 flex items-center">
     {
      user && (
        <div className='relative group'>
          <img className='w-[50px] h-[50px] object-cover rounded-full'  src={currentUser?.image} alt="" />
          <div className='absolute -bottom-4/2 mb-12 left-1/2 transform -translate-x-3/4 opacity-0 group-hover:opacity-100 transition ease-in-out duration-200'>
            <div>
              <p className={theme === 'light' ? "text-black" : "text-white"}>{currentUser?.name}</p>
              <Link to='/dashboard'><button className='mt-2 px-4 py-2 rounded bg-blue-500 text-white'>Dashboard</button></Link>
            </div>
          </div>
        </div>
      )
     }
      {user ? (
        <button
          className={`p-3 md:p-4 lg:p-4 xl:p-4 text-[13px] md:text-[14px] lg::text-[14px] xl:text-[14px] font-bold   border-0 ${
            theme === 'light' ? 'text-white bg-black ' : 'text-black bg-white'
          } duration-700`}
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      ) : (
        <Link to="/login">
          <button
            className={`p-4 text-[14px] font-bold   border-0 ${
              theme === 'light' ? 'text-white bg-black ' : 'text-black bg-white'
            } duration-700`}
          >
            Login
          </button>
        </Link>
      )}

      <button className={theme === 'light' ? 'text-black' : 'text-white'} onChange={handleToggleTheme}>
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" className="theme-controller" value="synthwave" />
          {/* sun icon */}
          <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
          </svg>
          {/* moon icon */}
          <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
          </svg>
        </label>
      </button>
    </div>


</div>
    </div>
   </div>
  );
};

export default NavBar;