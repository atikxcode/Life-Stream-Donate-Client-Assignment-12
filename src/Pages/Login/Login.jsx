import Aos from 'aos';
import 'aos/dist/aos.css'
import  { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaEye, FaEyeSlash} from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';
import { useForm } from 'react-hook-form';


const Login = () => {


  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  useEffect(() => {
    Aos.init();
  },[])


  const location = useLocation();
  const navigate = useNavigate();
  
  // const notify = () => toast("Successfully Logged In");
  // const notify1 = () => toast("Wrong Email Or Password");

  const {signIn} = useContext(AuthContext);

 

  const [showPassword, setShowPassword] = useState(false)
  


const onSubmit = data => {

  signIn(data.email, data.password)
    .then(result => {
      console.log(result.user)
      
        // notify();
     
      setTimeout(() => {
        navigate(location?.state ? location.state : '/dashboard');
      }, 2000)
      reset();
      
    })
    .catch(error => {
      console.error(error)
      // notify1();
    })
};





  return (
    <div className='pt-36 min-h-screen'>

      <Helmet>
      <meta charSet="utf-8" />
      <title>Login - Life Stream Donate</title>

      </Helmet>
    
    
    <div className="my-16" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500" >
    <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
    <div className="hidden bg-cover lg:block lg:w-1/2" style={{backgroundImage: "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')" }}></div>

    <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">


        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
        </p>


        <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <p className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 ">login
                with email</p>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>

        <form  onSubmit={handleSubmit(onSubmit)}>

        <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Email Address</label>
            <input {...register("email", { required: true })} type="email"  name="email" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" />
        </div>

        <div className="mt-4">
           <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Password</label>
           <div className="flex items-center  relative">
           <input 
           {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
              message: "Password must have an uppercase letter, a lowercase letter, and be at least 6 characters long"
            }
          })}
           className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type={showPassword ? 'text' : 'password'} name="password" />
           <span className="absolute right-[2%] top-[30%] text-white" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</span>
           </div>
        </div>
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

          <input type="submit" className="btn mt-4 bg-white text-black hover:text-white w-full" />
            

        </form>
        

        <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <a href="#" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"><Link to='/register'>or sign up</Link></a>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
    </div>
</div>
   </div>
   <ToastContainer />
   </div>
  );
};

export default Login;