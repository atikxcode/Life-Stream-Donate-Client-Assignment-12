import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Pages/Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaRegSadTear } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const DashBoardHome = () => {

  const {user} = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [showAll, setShowAll] = useState(false);

  const {isError, error, isPending, refetch, data: donationrequest} = useQuery({
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
  const filteredDonationRequest = showAll ? filteredDonation : filteredDonation.slice(-3);
  console.log(filteredDonationRequest) 

  if (isError) {
    return <p>Error: {error.message}</p>;
  }


  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(result => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/donationrequest/${id}`)
          .then(response => {
            const data = response.data;
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your request has been Successfully Deleted.",
                icon: "success"
              }).then(() => {
                window.location.reload();
              });
            }
          })
          .catch(error => {
            console.error('Error deleting file:', error);
            Swal.fire({
              title: "Error",
              text: "An error occurred while deleting the file.",
              icon: "error"
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  };

  const updateDonationStatus = (id, stat) => {
    const updateDonationStatus = {
      status : stat
    }
    axiosPublic.put(`/donationrequest/status/${id}`, updateDonationStatus)
    .then(res => {
      if(res.data.modifiedCount > 0){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Blood Donation Request Status Updated  Successfully",
          showConfirmButton: false,
          timer: 1500,
          
        });
        
        refetch();
        

      } 
    })
    .catch(error => {
      console.error(error)
    })
  }

  return (
    <div className=''>

    <Helmet>
      <meta charSet="utf-8" />
      <title>User Dashboard - Life Stream Donate</title>

      </Helmet>
      

      <div className=' flex my-10 justify-center'>
        <h2 className='text-6xl'>Welcome, {user?.displayName}!</h2>
      </div>

      <div className=' justify-center flex mb-20'>
        <p className='text-2xl'>Here is you last 3 donation request.</p>
      </div>

      <div>
          {filteredDonationRequest.length > 0 ? (
            filteredDonationRequest.map(donation => (
              <div className="overflow-x-auto shadow-custom mb-9 rounded-2xl" key={donation._id}>
                <table className="table w-full mb-8">
                  <thead>
                    <tr className='text-center'>
                      
                      <th className="text-center">Recipient Name</th>
                      <th className="text-center">Recipient Location</th>
                      <th className="text-center">Donation Date</th>
                      <th className="text-center">Donation Time</th>
                      {
                        donation?.status === 'inprogress' ? 
                        <th className="text-center">Donor Info</th> : 
                        ''
                      }
                      <th className="text-center">Status</th>
                      {/* <th className="text-left">Donor Info</th>      ------Here if there is any donor req his information will come then it will work  */}
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                     
                      <td className=" text-center">{donation.recipientName}</td>
                      <td className="  text-center">{donation.recipientUpazila}, {donation.recipientDistrict}</td>
                      <td className="  text-center">{donation.donationDate.split('T')[0]}</td>
                      <td className=" text-center">{donation.donationTime}</td>
                     
                    
                    {
                          donation?.status === 'inprogress' ? (
                           <td className='text-center'>
                             <div className=''>
                            <div className="font-bold">{donation?.donorName}</div>
                            <div className="text-sm opacity-50">{donation?.donorEmail}</div>
                          </div>
                           </td>
                          ) : ''
                        }
                    
                        <td className='text-center  items-center flex justify-center'>
                        {
                        donation?.status === 'inprogress' ? (<td className='items-center text-center'><div className='flex gap-4'><button className='btn' onClick={() => updateDonationStatus(donation._id, 'done')}>Done</button><button className='btn' onClick={() => updateDonationStatus(donation._id, 'canceled')}>Cancel</button></div></td>) : (<td>{donation.status}</td>) 
                        }
                        </td>
                      {/* <td>
                      <div>
                            <div className="font-bold">{donation.requestName}</div>
                            <div className="text-sm opacity-50">{donation.requestEmail}</div>
                          </div>
                      </td> */}
                      
                      <td className="w-[200px] text-center ">
                        <div className='flex gap-4 justify-center'>
                        <Link to={`/dashboard/updatedonationrequest/${donation._id}`}><button className="btn ">Edit</button></Link>
                        <button className="btn" onClick={() => handleDelete(donation._id)}>Delete</button>
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
      {
        filteredDonationRequest.length > 
        <div className=' flex justify-center'>
        <button className='btn' onClick={() => setShowAll(!showAll)}>{showAll ? 'Show Less' : 'Show All'}</button>
      </div>
      }
    </div>
  );
};

export default DashBoardHome;