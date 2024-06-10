import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import 'aos/dist/aos.css'
import Aos from "aos";
import image from '../../assets/blood-drop-plus-heart-shape-600nw-2238094877.webp'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const DonationRequest = () => {

  const axiosPublic = useAxiosPublic();

  const [selectedDistrictId, setSelectedDistrictId] = useState('');




  const { isPending, isError, error, data: donationRequest } = useQuery({
    queryKey: ['donationRequest'],
    queryFn: async () => {
      const res = await axiosPublic.get('/donationrequest');
      return res.data;
    }
  });

  if (isPending) {
    return <div className="mx-auto container flex justify-center"><span className="loading loading-dots loading-lg"></span></div>;
  }

  // console.log(donationRequest)
  const filteredDonationRequest = donationRequest.filter(donation => donation?.status === 'pending')

  console.log(filteredDonationRequest)
  if (isError) {
    return <p>Error: {error.message}</p>;
  }



 



  return (
    <div className='my-20 mx-auto container'>
       <Helmet>
      <meta charSet="utf-8" />
      <title>Donation Request - Life Stream Donate</title>

      </Helmet>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-16'>
                  {
            filteredDonationRequest.map(donor => 
              <div className="" key={donor._id}>
          <div className="mx-auto hover:scale-110 duration-1000 transition-all bg-[#1b1b1b] w-[90%] xl:w-[450px] shadow-custom">
          <img className=" h-[350px] w-full" src={image} alt="" />
         
         <div className="flex justify-between">

         <div className="flex text-white gap-2 flex-col items-start p-8 bg-[#1b1b1b] opacity-70">
          
          {/* <p className="font-extrabold">Requester Email:   <span className="text-[14px] text-gray-400">{donor?.requestEmail}</span></p> */}
          {/* <p className="font-extrabold">Requester Name:  <span className="text-[14px] text-gray-400">{donor?.requestName}</span> </p> */}
          <p className="font-extrabold">Recipient Name:   <span className="text-[14px] text-gray-400">{donor?.recipientName}</span> </p>
          {/* <p className="font-extrabold">Recipient Blood group: <span className="text-[14px] text-gray-400">{donor?.recipientBloodgroup}</span> </p> */}
          <p className="font-extrabold">Recipient District: <span className="text-[14px] text-gray-400">{donor?.recipientDistrict}</span></p>
          <p className="font-extrabold">Recipient Upazila: <span className="text-[14px] text-gray-400">{donor?.recipientUpazila}</span></p>
          <p className="font-extrabold">Hospital Name: <span className="text-[14px] text-gray-400">{donor?.hospital}</span></p>
          <p className="font-extrabold">Recipient Address: <span className="text-[14px] text-gray-400">{donor?.recipientAddress}</span></p>
          {/* <p className="font-extrabold">Donation Date: <span className="text-[14px] text-gray-400">{donor?.donationDate}</span></p> */}
          <p className="font-extrabold">Donation Time: <span className="text-[14px] text-gray-400">{donor?.donationTime}</span></p>
          {/* <p className="font-extrabold">Message From Requester: <span className="text-[14px] text-gray-400">{donor?.message}</span></p> */}
          </div>
          <div className="p-8 items-center flex-col ">
          
          <Link to={`/details/${donor?._id}`}>
          <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
            View Details
          </button>
        </Link>
            
          </div>
         </div>
          
          </div>
          </div>

            )
          }
                  </div>
          
    </div>
  );
};

export default DonationRequest;