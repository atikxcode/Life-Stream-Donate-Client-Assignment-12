import Aos from 'aos';
import 'aos/dist/aos.css'
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";

import { Helmet } from 'react-helmet';
import bg from '../../assets/building-business-city-construction-geometry.jpg'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;



const Register = () => {
  const axiosPublic = useAxiosPublic();
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [districtName, setDistrictName] = useState('')


  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const password = watch('password');
 
 
  const navigate = useNavigate();
  
  // const notify = () => toast("Thanks for joining with us");

  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUser } = useContext(AuthContext);
  
  useEffect(() => {
    Aos.init();
  }, []);

  const { isPending, isError, error, data: upazilas } = useQuery({
    queryKey: ['upazilas'],
    queryFn: async () => {
      const res = await axiosPublic.get('/upazilas');
      return res.data;
    }
  });

  const { data: districts } = useQuery({
    queryKey: ['district'],
    queryFn: async () => {
      const res = await axiosPublic.get('/district');
      return res.data;
    }
  });

  if (isPending) {
    return <div className="mx-auto container flex justify-center"><span className="loading loading-dots loading-lg"></span></div>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const filteredUpazilas = upazilas.filter(upazila => upazila.district_id == selectedDistrictId);

  // console.log(filteredUpazilas);

  

  const onSubmit = async (data) => {
    console.log(data);
    
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
    if (res.data.success) {
      const userDetails = {
        email: data.email,
        name: data.name,
        bloodgroup: data.bloodType,
        district: districtName,
        upazila: data.upazila,
        image: res.data.data.display_url,
        password: data.password,
        confirm_password: data.confirm_password,
        role: 'donor',
        status: 'active'
      };

      console.log(userDetails)

      createUser(userDetails.email, userDetails.password)
      .then(result => {
        updateUser(result.user, userDetails.name, userDetails.image)
        .then(() => {
          setTimeout(() => {
            
            reset();
          }, 500);

          setTimeout(() => {
            navigate(location?.state ? location.state : '/dashboard')
          }, 2000);

          axiosPublic.post('/user', userDetails)
          .then(res => {
            if(res.data.insertedId){
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${userDetails.name} is new user as donor`,
                showConfirmButton: false,
                timer: 1500
            });
            }
          })

        })

        .catch(error => {
          console.error(error)
        })
      })
    }
  };

 



  return (
    <div className='py-20 '>

    <Helmet>
      <meta charSet="utf-8" />
      <title>Register - Life Stream Donate</title>

      </Helmet>
     

<div className='mx-auto container' data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500">
<div className="bg-white dark:bg-gray-900">
<div className="flex justify-center h-screen">
<div className="hidden bg-cover lg:block lg:w-2/3" style={{ backgroundImage: `url(${bg})` }}>
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
<p className="mt-3 text-gray-500 dark:text-gray-300">Register Your Account</p>
</div>
<div className="mt-8">
<form onSubmit={handleSubmit(onSubmit)}>
<div className='mb-4'>
<label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
<input {...register("email", { required: true })} type="email" name="email" placeholder="example@example.com" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
</div>
<div>
<label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
<input {...register("name", { required: true })} type="text" name="name" placeholder="Jon Doe" className="block w-full px-4 py-2 mb-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
</div>
<div>
<label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">User Photo / Avatar</label>
<input {...register("image", { required: true })} type="file" name="image" placeholder="Image URL" className="block w-full px-4 py-2 mb-4 b text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
</div>
<div>
<label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Blood Type</label>
<select {...register("bloodType")} name="bloodType" className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required>
<option value="">Select Blood Type</option>
<option value="A+">A+</option>
<option value="A-">A-</option>
<option value="B+">B+</option>
<option value="B-">B-</option>
<option value="AB+">AB+</option>
<option value="AB-">AB-</option>
<option value="O+">O+</option>
<option value="O-">O-</option>
</select>
</div>

    <div>
    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">District</label>
    <select {...register("district", { required: true })} name="district" 

    onChange={ (e) => {
    const [id, name] = e.target.value.split(',');
    setSelectedDistrictId(id)
    setDistrictName(name)
    }} 
    className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" >
    <option value="">Select District</option>
    {districts?.map(district => (
    <option key={district._id} value={`${district.division_id}, ${district.name}`}>
    {district.name}
    </option>
    ))}
    </select>
    </div>


    

      <div>
      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Upazila</label>
      <select {...register("upazila", { required: true })} name="upazila" className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" >
      <option value="">Select Upazila</option>
      {filteredUpazilas?.map(upazila => (
      <option key={upazila._id} value={upazila.name}>
        {upazila.name}
      </option>
      ))}
      </select>
      </div>

<div className="mt-6">
  <label className="text-sm text-gray-600 dark:text-gray-200">Password</label>
  <div className="flex items-center relative">
    <input
      {...register("password", {
        required: "Password is required",
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
          message: "Password must have an uppercase letter, a lowercase letter, and be at least 6 characters long"
        }
      })}
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="Your Password"
      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
    />
    <span className="absolute right-[5%] top-[45%] text-white" onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
</div>

{errors.password && <span>Password must be 6 characters and at least 1 uppercase and 1 lowercase is must</span>}


<div className="mt-6">
  <label className="text-sm text-gray-600 dark:text-gray-200">Confirm Password</label>
  <div className="flex items-center relative">
    <input
      {...register("confirm_password", {
        required: "Confirm password is required",
        validate: (value) => value === password || "Passwords do not match",
      })}
      type={showPassword ? "text" : "password"}
      name="confirm_password"
      placeholder="Confirm Password"
      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
    />
    <span className="absolute right-[5%] top-[45%] text-white" onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
  {errors.confirm_password && <p className="text-red-500 text-sm mt-1">{errors.confirm_password.message}</p>}
</div>


<div className="mt-6">
<input type="submit" className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50' />
</div>


</form>
<p className="mt-6 text-sm text-center text-gray-400">Already have an account yet? <Link to='/login' className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign In</Link>.</p>
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
