import Aos from 'aos';
import 'aos/dist/aos.css'
import {  useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { Helmet } from 'react-helmet';
import bg from '../../assets/building-business-city-construction-geometry.jpg'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';


const Register = () => {


  useEffect(() => {
    Aos.init();
  },[])


  const isValidURL = (string) => {
    var res = string.match(/\bhttps?:\/\/\S+\.(jpeg|jpg|gif|png|bmp|svg|webp|tiff|ico)\b/i);
    return (res!== null)
  };




  const navigate  = useNavigate();

  const notify1 = () => toast("Password must have an uppercase letter, a lowercase letter, and a minimum length of 6 characters.");
  const notify2 = () => toast("Thanks for joining with us");

  const [showPassword, setShowPassword] = useState(false)

  const {createUser, updateUser} = useContext(AuthContext);


  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleRegister = e => {
    
    e.preventDefault();
    const form = new FormData(e.currentTarget);

  

    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);

    if (!isValidPassword) {
      notify1();
      return;
    }

    // Creating user here
    createUser(email, password)
    .then(result => {
      
      
      updateUser(result.user, name, isValidURL(photo) ? photo :  'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg')
      .then(() => {
        
        setTimeout(() => {
          notify2();
          setName('')
          setPhoto('')
          setEmail('')
          setPassword('')
          
        }, 500);

        setTimeout(() => {
          
          navigate(location?.state ? location.state : '/');
          window.location.reload();
        }, 2000);
        
        
      })
      .catch(error => {
        console.error(error)
      })
      
    })
    .catch(error => {
      console.error(error)
    })


  
  }


  return (
    <div>
      <Helmet>
      <meta charSet="utf-8" />
      <title>CareerCanvas - Register</title>

      </Helmet> 
      


    <div className='mx-auto container' data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500" >

    <div className="bg-white dark:bg-gray-900">
    <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/3" style={{backgroundImage: `url(${bg})`}}>
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                <div>
                    <h2 className="text-2xl font-bold text-white sm:text-3xl">Register Now!</h2>

                    <p className="max-w-xl mt-3 text-gray-300">
                    Registering enables you to stay connected with our community and be part of a vibrant network of users sharing similar interests and passions.
                    </p>
                </div>
            </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
                <div className="text-center">
                    {/* <div className="flex justify-center mx-auto">
                    <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
                    </div> */}

                    <p className="mt-3 text-gray-500 dark:text-gray-300">Register Your Account</p>
                </div>

                <div className="mt-8">
                    <form onSubmit={handleRegister}>
                        <div>
                            <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
                            <input type="text" name="name"  placeholder="Jon Doe" className="block w-full px-4 py-2 mb-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" value={name} onChange={e => setName(e.target.value)} required />
                        </div>

                        <div>
                            <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Photo URL</label>
                            <input type="text" name="photo"  placeholder="Image URL" className="block w-full px-4 py-2 mb-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" value={photo} onChange={e => setPhoto(e.target.value)} required />
                        </div>

                        <div>
                            <label  className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                            <input type="email" name="email"  placeholder="example@example.com" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>

                        <div className="mt-6">
                            <label  className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                            <div className="flex items-center  relative">
                            <input type="password" name="password"  placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" value={password} onChange={e => setPassword(e.target.value)} required />
                            <span className="absolute right-[5%] top-[45%] text-white" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <input type="submit"  className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50' />
                        </div>

                    </form>

                    <p className="mt-6 text-sm text-center text-gray-400">Already have an account yet? <a href="#" className="text-blue-500 focus:outline-none focus:underline hover:underline"><Link to='/login'>Sign In</Link></a>.</p>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
    <ToastContainer />
    </div>
  );
};

export default Register;