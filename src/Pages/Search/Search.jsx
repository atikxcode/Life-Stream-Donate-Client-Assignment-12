import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import 'aos/dist/aos.css'
import Aos from "aos";
import image from '../../assets/blood-drop-plus-heart-shape-600nw-2238094877.webp'


const Search = () => {

  

  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit } = useForm();
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [districtName, setDistrictName] = useState('')
  const [filteredDonor, setFilteredDonor] = useState([])



  const { isPending, isError, error, data: donationRequest } = useQuery({
    queryKey: ['donationRequest'],
    queryFn: async () => {
      const res = await axiosPublic.get('/donationrequest');
      return res.data;
    }
  });
  

  const {data: upazilas } = useQuery({
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

  // console.log(donationRequest, upazilas, districts)


  if (isPending) {
    return <div className="mx-auto container flex justify-center"><span className="loading loading-dots loading-lg"></span></div>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

 

  const onSubmit = (data) => {

    // console.log(data)
    let filteredData = donationRequest;
    // console.log(districtName)

    // Filter by blood group
    filteredData = filteredData.filter(item => item.recipientBloodgroup.trim() === data.bloodGroup);

    filteredData = filteredData.filter(item => item.recipientDistrict.trim() === districtName.trim());
    
  

    filteredData = filteredData.filter(item => item.recipientUpazila.trim() === data.upazila);
    console.log('Filtered Data:', filteredData);
    setFilteredDonor(filteredData)

   
    
  };



  const filteredUpazilas = upazilas?.filter(upazila => upazila?.district_id == selectedDistrictId);


  return (
      <div>
            <div className="flex my-20 flex-col gap-26 items-center justify-center ">
      <h1 className="text-3xl font-semibold mb-8">Search Donor</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <div className="mb-4">
          <label htmlFor="bloodGroup" className="block text-white text-sm font-bold mb-2">Blood Group</label>
          <select 
            {...register("bloodGroup", { required: true })} 
            id="bloodGroup" 
            name="bloodGroup" 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-red-700 leading-tight focus:outline-none focus:shadow-outline" 
            required
          >
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
        <div className="mb-4">
          <label htmlFor="district" className="block text-white text-sm font-bold mb-2">District</label>
          <select
            id="district"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            {...register('district', { required: true })}
            onChange={ (e) => {
              const [id, name] = e.target.value.split(',');
              setSelectedDistrictId(id)
              setDistrictName(name)
              }} 
          >
            <option value="">Select District</option>
            {districts?.map(district => (
          <option key={district._id} value={`${district.division_id}, ${district.name}`}>
          {district.name}
          </option>
          ))}
           
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="upazila" className="block text-white text-sm font-bold mb-2">Upazila</label>
          <select
            id="upazila"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            {...register('upazila', { required: true })}
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas?.map(upazila => (
            <option key={upazila._id} value={upazila.name}>
              {upazila.name}
            </option>
            ))}
            
          </select>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>

          </div>

          <div className='mx-auto container mb-10 flex flex-col items-center'>
            




                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-16'>
                  {
            filteredDonor.map(donor => 
              <div className="" key={donor._id}>
          <div className="mx-auto hover:scale-110 duration-1000 transition-all bg-[#1b1b1b] w-[90%] xl:w-[450px]">
          <img className=" h-[350px] w-full" src={image} alt="" />
         
         <div className="flex justify-between">

         <div className="flex text-white gap-2 flex-col items-start p-8 bg-[#1b1b1b] opacity-70">
          {/* <p className="text-lg text-orange-500 mb-2">{jobApplied?.title}</p> */}
          <p className="font-extrabold">Requester Email:   <span className="text-[14px] text-gray-400">{donor?.requestEmail}</span></p>
          <p className="font-extrabold">Requester Name:  <span className="text-[14px] text-gray-400">{donor?.requestName}</span> </p>
          <p className="font-extrabold">Recipient Name:   <span className="text-[14px] text-gray-400">{donor?.recipientName}</span> </p>
          <p className="font-extrabold">Recipient Blood group: <span className="text-[14px] text-gray-400">{donor?.recipientBloodgroup}</span> </p>
          <p className="font-extrabold">Recipient District: <span className="text-[14px] text-gray-400">{donor?.recipientDistrict}</span></p>
          <p className="font-extrabold">Recipient Upazila: <span className="text-[14px] text-gray-400">{donor?.recipientUpazila}</span></p>
          <p className="font-extrabold">Hospital Name: <span className="text-[14px] text-gray-400">{donor?.hospital}</span></p>
          <p className="font-extrabold">Recipient Address: <span className="text-[14px] text-gray-400">{donor?.recipientAddress}</span></p>
          <p className="font-extrabold">Donation Date: <span className="text-[14px] text-gray-400">{donor?.donationDate}</span></p>
          <p className="font-extrabold">Donation Time: <span className="text-[14px] text-gray-400">{donor?.donationTime}</span></p>
          <p className="font-extrabold">Message From Requester: <span className="text-[14px] text-gray-400">{donor?.message}</span></p>
          </div>
          <div className="p-8 items-center flex-col ">
         {/* <Link to={`/viewdetails2/${jobApplied?._id}`}> <button className="text-gray-400 btn border-orange-400 bg-inherit hover:text-white hover:font-bold hover:border-orange-500 transition-all">View Details</button></Link> */}
         
          </div>
         </div>
          
          </div>
          </div>

            )
          }
                  </div>
          






          </div>
      </div>
  );
};

export default Search;