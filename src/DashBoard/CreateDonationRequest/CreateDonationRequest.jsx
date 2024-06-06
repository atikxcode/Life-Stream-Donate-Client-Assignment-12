import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import image from '../../assets/event_1.webp'
import image2 from '../../assets/home_1_slider_1.webp'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-clock/dist/Clock.css';
import { AuthContext } from '../../Pages/Provider/AuthProvider';

const CreateDonationRequest = () => {

  const {user} = useContext(AuthContext)

  const axiosPublic = useAxiosPublic();
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [districtName, setDistrictName] = useState('')



  const { register, handleSubmit, watch, control, formState: { errors } } = useForm();


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

  const { data: userDetails, isLoading } = useQuery({
    queryKey: ['userDetails'],
    queryFn: async () => {
      const res = await axiosPublic.get('/user');
      return res.data;
    }
  });

  const currentUser = userDetails?.find(userDetail => userDetail?.email === user?.email);
  // Filter to get current user details
  useEffect(() => {
    if (currentUser) {
      console.log('Current User:', currentUser);
    }
  }, [currentUser]);


  if (isPending) {
    return <div className="mx-auto container flex justify-center"><span className="loading loading-dots loading-lg"></span></div>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

 

  

  const filteredUpazilas = upazilas.filter(upazila => upazila.district_id == selectedDistrictId);



  const onSubmit = data =>{
    
    
    
    const donationRequest = {
        requestEmail: currentUser?.email,
        requestName: currentUser?.name,
        recipientName: data.recipientname,
        recipientBloodgroup: data.bloodType,
        recipientDistrict: districtName,
        recipientUpazila: data.upazila,
        hospital: data.hospitalname,
        recipientAddress: data.fulladdress,
        donationDate: data.donationdate,
        donationTime: data.donationtime,
        message: data.requestmessage
    }

    console.log(donationRequest)
  
  };


  return (
    <div className=''>

     <div className='flex flex-col items-center gap-8 p-8 shadow-custom'>

     <div className='w-1/2'>
        <img src={image2} alt="" />
      </div>

      <div className='w-1/2'>
      <form onSubmit={handleSubmit(onSubmit)}>

      <div>
      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Requester Name</label>
      <input defaultValue={currentUser?.name} readOnly type="text" name="name"  className="block w-full px-4 py-2 mb-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
      </div>


      <div className='mb-4'>
      <label   className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Requester Email</label>
      <input defaultValue={currentUser?.email}  readOnly type="email" name="email"  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
      </div>

      <div className='mb-4'>
      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Recipient Name</label>
      <input {...register("recipientname", { required: true })} type="text" name="recipientname" placeholder="Jon Doe" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
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



      <div className='mb-4'>
      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Hospital Name</label>
      <input {...register("hospitalname", { required: true })} type="text" name="hospitalname" placeholder="Dummy Hospital" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
      </div>


      <div className='mb-4'>
      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Address</label>
      <input {...register("fulladdress", { required: true })} type="text" name="fulladdress" placeholder="1234 Elm Street, Apt 56, Springfield, IL 62704, USA" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
      </div>


      <div className='mb-4'>
      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Donation Date</label>
     
     <Controller
     
     control={control}
     name='donationdate'
     rules={{required: true}}
     render={({field}) => (

      <DatePicker
      selected={field.value}
      onChange={(date) => field.onChange(date)}
      placeholderText='Donation Date'
      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
      
      >

      </DatePicker>
     )}
     
     />
    
      </div>








      <div className='mb-4'>
      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Donation Time</label>
      <input defaultValue={'10:30 AM'} placeholder="10:30 AM" {...register("donationtime", { required: true })} type="text" name="donationtime"  className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
      </div>





      <div>
      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Request Message</label>
      <input {...register("requestmessage", { required: true })} type="text"  name='requestmessage' placeholder="Write why you need blood" className="block w-full px-4 py-2 mb-4 b text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
      </div>




  

     









      <input type="submit" className="btn mt-4 bg-white text-black hover:text-white w-full" />


    </form>
      </div>
     </div>

    </div>
  );
};

export default CreateDonationRequest;