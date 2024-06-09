import { useQuery } from '@tanstack/react-query';
import Aos from 'aos';
import React, { useContext, useEffect, useState } from 'react';
import 'aos/dist/aos.css'
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { AuthContext } from '../../../Pages/Provider/AuthProvider';
import { FaRegSadTear } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllBloodDonationRequest = () => {


  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [postedByEmail, setPostedByEmail] = useState('');


  const modal = (donation) => {
    

     
  setTimeout(() => {
    setSelectedDonation(donation)
  }, 300)
}

useEffect(() => {
  Aos.init();
},[])

const { isPending, isError, error,refetch, data: donationRequest } = useQuery({
  queryKey: ['donationRequest'],
  queryFn: async () => {
    const res = await axiosPublic.get('/donationrequest');
    return res.data;
  }
});


const { data: allUsers } = useQuery({
  queryKey: ['allUsers'],
  queryFn: async () => {
    const res = await axiosPublic.get('/user');
    return res.data;
  }
});




if (isPending) {
  return <div className="mx-auto container flex justify-center"><span className="loading loading-dots loading-lg"></span></div>;
}

const handleFilterChange = (event) => {
  setStatusFilter(event.target.value);
};

// console.log(donationRequest)
console.log(allUsers)



const filteredAndStatusDonation = donationRequest.filter(donation => {
  if (statusFilter === 'all') {
    return true;
  }
  return donation.status === statusFilter;
});

// console.log(filteredAndStatusDonation)




if (isError) {
  return <p>Error: {error.message}</p>;
}

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
    <div>
     <div>
      <div className="flex flex-col gap-20">
        <div className="flex justify-center">
          <h2 className="text-4xl text-semibold text-center">Here Are All The Donation Request Of the Users</h2>
        </div>

       
        
        <div className="flex justify-end mb-4">
          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <div>
          {filteredAndStatusDonation.length > 0 && (
            filteredAndStatusDonation.map(donation => (
              
              <div className="overflow-x-auto shadow-custom mb-9 rounded-2xl" key={donation._id}>
                <table className="table w-full mb-8">
                  <thead>
                    <tr>
                      <th className="w-1/4 text-center">Posted By</th>
                      <th className="w-1/4 text-center">Recipient Name</th>
                      <th className="w-1/4 text-center">Recipient Location</th>
                      <th className="w-1/4 text-center">Blood Group</th>
                      <th className="w-1/4 text-center">Status</th>
                      <th className="w-1/4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='text-center'>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            {/* <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={
                                  
                                }
                                alt="Avatar"
                              />
                            </div> */}
                          </div>
                          <div className=' w-full'>
                            <div className="font-bold">{donation.requestName}</div>
                            <div className="text-sm opacity-50">{donation.requestEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className='text-center' >{donation.recipientName}</td>
                      <td className='text-center'>{donation.recipientUpazila}, {donation.recipientDistrict}</td>
                      <td className='text-center'>{donation.recipientBloodgroup}</td>
                      <td className='text-center'>
                      {
                        donation?.status === 'inprogress' ? (<td className='items-center'><div className='flex gap-4'><button className='btn' onClick={() => updateDonationStatus(donation._id, 'done')}>Done</button><button className='btn' onClick={() => updateDonationStatus(donation._id, 'canceled')}>Cancel</button></div></td>) : (<td>{donation.status}</td>) 
                      }
                      </td>
                      <td>
                        <button 
                          className="btn" 
                          onClick={() => modal(donation)}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))



          )
          }
        </div>
      </div>

      {selectedDonation && (
        <dialog id="my_modal_2" className="modal transition-all" data-aos="fade-up" data-aos-anchor-placement="center-bottom" open>
          <div className="modal-box flex flex-col items-center gap-6">
            <h3 className="font-bold text-lg">Recipient Name: {selectedDonation.recipientName}</h3>
            <h3 className="font-bold text-lg">Recipient Blood Group: {selectedDonation.recipientBloodgroup}</h3>
            <h3 className="font-bold text-lg">Recipient District: {selectedDonation.recipientDistrict}</h3>
            <h3 className="font-bold text-lg">Recipient Upazila: {selectedDonation.recipientUpazila}</h3>
            <h3 className="font-bold text-lg">Hospital: {selectedDonation.hospital}</h3>
            <h3 className="font-bold text-lg">Recipient Address: {selectedDonation.recipientAddress}</h3>
            <h3 className="font-bold text-lg">Donation Date: {selectedDonation.donationDate}</h3>
            <h3 className="font-bold text-lg">Donation Time: {selectedDonation.donationTime}</h3>
            <button 
              className="btn" 
              onClick={() => setSelectedDonation(null)}
            >
              Close
            </button>
          </div>
        </dialog>
      )}
    </div>
    </div>
  );
};

export default AllBloodDonationRequest;