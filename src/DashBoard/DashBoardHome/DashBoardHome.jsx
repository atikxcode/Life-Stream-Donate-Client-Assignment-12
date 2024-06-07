import React, { useContext } from 'react';
import { AuthContext } from '../../Pages/Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaRegSadTear } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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

  const filteredDonation = donationrequest.filter(donation => donation?.requestEmail === user?.email);
  const filteredDonationRequest = filteredDonation.slice(0, 3)
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
                      
                      <th className="text-center">Recipient Name</th>
                      <th className="text-center">Recipient Location</th>
                      <th className="text-center">Donation Date</th>
                      <th className="text-center">Donation Time</th>
                      <th className="text-center">Status</th>
                      {/* <th className="text-left">Donor Info</th>      ------Here if there is any donor req his information will come then it will work  */}
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                     
                      <td className="w-[200px]  text-center">{donation.recipientName}</td>
                      <td className="w-[200px]  text-center">{donation.recipientUpazila}, {donation.recipientDistrict}</td>
                      <td className="w-[200px]  text-center">{donation.donationDate.split('T')[0]}</td>
                      <td className="w-[200px]  text-center">{donation.donationTime}</td>
                      <td className="w-[200px] text-center">
                      {
                        donation.status === 'inprogress' ? (
                          <div className="flex gap-2 justify-center">
                            <button className="btn" disabled={false}>Done</button>
                            <button className="btn" disabled={false}>Cancel</button>
                          </div>
                        ) : donation.status === 'done' ? (
                          <div className="flex gap-2 justify-center">
                            <button className="btn" disabled={true}>Done</button>
                            <button className="btn" disabled={true}>Cancel</button>
                          </div>
                        ) : donation.status === 'canceled' ? (
                          <div className="flex gap-2 justify-center">
                            <button className="btn" disabled={true}>Done</button>
                            <button className="btn" disabled={true}>Cancel</button>
                          </div>
                        ) : (
                          donation.status
                        )
                      }
                    </td>
                      {/* <td>
                      <div>
                            <div className="font-bold">{donation.requestName}</div>
                            <div className="text-sm opacity-50">{donation.requestEmail}</div>
                          </div>
                      </td> */}
                      
                      <td className="w-[200px] ">
                        <div className='flex gap-4 justify-center'>
                        <Link to={`/dashboard/updatedonationrequest/${donation._id}`}><button className="btn ">Edit</button></Link>
                        <button className="btn ">Delete</button>
                        </div>
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