import React, { useContext } from 'react';
import { AuthContext } from '../../Pages/Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaRegSadTear } from 'react-icons/fa';

const DashBoardHome = () => {

  const {user} = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const {isError, error, isPending, data: donationrequest} = useQuery({
    queryKey: ['donationrequest'],
    queryFn: async () => {
      const res = await axiosPublic.get('/donationrequest')
      return res.data
    }
  })

  if (isPending) {
    return <div className="mx-auto container flex justify-center"><span className="loading loading-dots loading-lg"></span></div>;
  }

  // console.log(donationrequest)

  const filteredDonationRequest = donationrequest.filter(donation => donation?.requestEmail === user?.email);
  console.log(filteredDonationRequest) 

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className=''>

      <div className=' flex my-10 justify-center'>
        <h2 className='text-6xl'>Welcome, {user?.displayName}!</h2>
      </div>

      <div className=' justify-center flex mb-20'>
        <p className='text-2xl'>Here is you last 3 donation request.</p>
      </div>

      <div>
          {filteredDonationRequest.length > 0 ? (
            filteredDonationRequest.map(donation => (
              <div className="overflow-x-auto shadow-custom mb-9" key={donation._id}>
                <table className="table w-full mb-8">
                  <thead>
                    <tr>
                      
                      <th className="text-left">Recipient Name</th>
                      <th className="text-left">Recipient Location</th>
                      <th className="text-left">Blood Group</th>
                      <th className="text-left">Status</th>
                      <th className="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                     
                      <td>{donation.recipientName}</td>
                      <td className="w-[200px]">{donation.recipientUpazila}, {donation.recipientDistrict}</td>
                      <td>{donation.recipientBloodgroup}</td>
                      <td>{donation.status}</td>
                      <td>
                        <button 
                          className="btn btn-ghost btn-xs" 
                         
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <div className='flex flex-col gap-10 h-screen items-center  justify-center'>
              <p className='text-5xl'><FaRegSadTear /></p>
              <h2 className='text-4xl'>You haven't posted any <span className="font-bold">Donation</span> Request</h2>
            </div>
          )}
        </div>
      
    </div>
  );
};

export default DashBoardHome;