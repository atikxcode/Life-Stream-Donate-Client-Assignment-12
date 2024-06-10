import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ViewDetails = () => {
  const {user} = useContext(AuthContext)
  const axiosPublic = useAxiosPublic();
  const donor = useLoaderData();
  // console.log(donor)
  const {_id, requestEmail, requestName, recipientName, recipientBloodgroup, recipientDistrict, recipientUpazila, hospital, recipientAddress, donationDate, donationTime, message} = donor;


  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // React Hook Form setup
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // console.log(data);

    const donationInfo = {
      donorEmail : data.donorEmail,
      donorName : data.donorName,
      status : 'inprogress'
    }

    console.log(donationInfo)

    axiosPublic.put(`/donationrequest/donor/${_id}`, donationInfo)
    .then(res => {
      if(res.data.modifiedCount > 0){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Request Submitted Successfully",
          showConfirmButton: false,
          timer: 1500,
          
        });
        // reset()
      } 
    })
    .catch(error => {
      console.error(error)
    })

    // You can handle form submission logic here

    setIsModalOpen(false); // Close modal after form submission
  };

  
  return (
    <div className="my-36">


      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
    
    
    <h1 className="text-2xl font-bold text-center mb-6 text-red-600">Donation Details</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="detail-item">
        <strong className="block font-semibold">Request Name:</strong> 
        <p className="text-gray-700">{requestName}</p>
      </div>
      <div className="detail-item">
        <strong className="block font-semibold">Request Email:</strong> 
        <p className="text-gray-700">{requestEmail}</p>
      </div>
      <div className="detail-item">
        <strong className="block font-semibold">Recipient Name:</strong> 
        <p className="text-gray-700">{recipientName}</p>
      </div>
      <div className="detail-item">
        <strong className="block font-semibold">Recipient Blood Group:</strong> 
        <p className="text-gray-700">{recipientBloodgroup}</p>
      </div>
      <div className="detail-item">
        <strong className="block font-semibold">Recipient District:</strong> 
        <p className="text-gray-700">{recipientDistrict}</p>
      </div>
      <div className="detail-item">
        <strong className="block font-semibold">Recipient Upazila:</strong> 
        <p className="text-gray-700">{recipientUpazila}</p>
      </div>
      <div className="detail-item">
        <strong className="block font-semibold">Hospital:</strong> 
        <p className="text-gray-700">{hospital}</p>
      </div>
      <div className="detail-item">
        <strong className="block font-semibold">Recipient Address:</strong> 
        <p className="text-gray-700">{recipientAddress}</p>
      </div>
      <div className="detail-item">
        <strong className="block font-semibold">Donation Date:</strong> 
        <p className="text-gray-700">{donationDate}</p>
      </div>
      <div className="detail-item">
        <strong className="block font-semibold">Donation Time:</strong> 
        <p className="text-gray-700">{donationTime}</p>
      </div>
      <div className="detail-item sm:col-span-2">
        <strong className="block font-semibold">Message:</strong> 
        <p className="text-gray-700">{message}</p>
      </div>
    </div>

    <div className="text-center mt-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            onClick={() => setIsModalOpen(true)}
          >
            Donate
          </button>
        </div>
        {/* Donate form modal */}
        <div className={`fixed inset-0 z-50 ${isModalOpen ? '' : 'hidden'}`}>
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
            <div className="relative bg-white rounded-md shadow-lg p-6 w-full max-w-md">
              <button
                className="absolute top-0 right-0 p-2 focus:outline-none"
                onClick={() => setIsModalOpen(false)}
              >
                <svg
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <h2 className="text-xl font-bold mb-4">Donate Form</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="donorName" className="block text-gray-700 font-semibold mb-2">Your Name</label>
                  <input
                    type="text"
                    id="donorName"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    
                    value={user?.displayName}
                    {...register('donorName')}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="donorEmail" className="block text-gray-700 font-semibold mb-2">Your Email</label>
                  <input
                    type="email"
                    id="donorEmail"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    readOnly
                    value={user?.email}
                    {...register('donorEmail')}
                  />
                </div>
                {/* Additional form fields can be added here */}
                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                  >
                    Confirm Donation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>


  </div>



    </div>
  );
};

export default ViewDetails;