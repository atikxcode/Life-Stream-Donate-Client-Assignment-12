import React, { useContext } from 'react';
import { AuthContext } from '../../../Pages/Provider/AuthProvider';
import { FaUsers, FaMoneyBillAlt, FaHandsHelping } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const AdminHome = () => {
  const {user} = useContext(AuthContext)
  const axiosPublic = useAxiosPublic();

  const {isError, error, isPending, data: users} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosPublic.get('/user')
      return res.data
    }
  })

  const { data: donationRequest} = useQuery({
    queryKey: ['donationRequest'],
    queryFn: async () => {
      const res = await axiosPublic.get('/donationrequest')
      return res.data
    }
  })

  if (isPending) {
    return <div className="mx-auto container flex justify-center"><span className="loading loading-dots loading-lg"></span></div>;
  }

  const donor = users.filter(users => users.role === 'donor');
  
  // console.log(donor?.length)
  // console.log(donationRequest)



  if (isError) {
    return <p>Error: {error.message}</p>;
  }


  return (
    <div>
      <div className=' flex flex-col my-10 items-center gap-10 justify-center'>
        <h2 className='text-6xl'>Welcome, {user?.displayName}!</h2>
        <p className='text-2xl'>Overview</p>
      </div>

      <div className='flex gap-4 mb-10'>

        <div className=' w-1/2 bg-red-200 rounded-xl text-black p-8'>
          <div className='flex items-center justify-around'>
            <p className='text-8xl p-4  rounded-xl text-red-600'><FaUsers /></p>

            <div className='flex flex-col items-center gap-4'>
              <h2 className='text-5xl font-bold italic'>Total Users</h2>
              <p className='text-2xl'>{donor?.length}</p>
            </div>
          </div>
        </div>

        <div className=' w-1/2 bg-blue-200 rounded-xl text-black p-8'>
          <div className='flex items-center justify-around'>
            <p className='text-8xl p-4  rounded-xl text-blue-400'><FaMoneyBillAlt /></p>

            <div className='flex flex-col items-center gap-4'>
              <h2 className='text-5xl font-bold italic'>Total Funding</h2>
              <p className='text-2xl'>$234235</p>
            </div>
          </div>
        </div>

      </div>


      <div className='  bg-green-200 rounded-xl text-black p-8'>
          <div className='flex items-center justify-around'>
            <p className='text-8xl p-4  rounded-xl text-green-500'><FaHandsHelping /></p>

            <div className='flex flex-col items-center gap-4'>
              <h2 className='text-5xl font-bold italic'>Total Blood Donation Request</h2>
              <p className='text-2xl'>{donationRequest?.length}</p>
            </div>
          </div>
        </div>


    </div>
  );
};

export default AdminHome;