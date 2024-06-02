import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../Pages/Provider/AuthProvider';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true);

  const buttonUnlock = (e) => {
    e.preventDefault();
    setDisabled(!disabled);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = {image: data.image[0]}
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type' : 'multipart/form-data'
      }
    })
    if(res.data.success){
      const updatedProfile = {
                name: data.name,
                bloodgroup: data.bloodgroup,
                district: data.district,
                upazila: data.upazila,
                image: res.data.data.display_url
      }

      console.log(updatedProfile)

    }
  };


  return (
    <div className='border my-20'>
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex p-4 justify-end'>
          <button  onClick={buttonUnlock} className='btn btn-secondary'>
            {disabled ? 'EDIT' : 'CANCEL'}
          </button>
        </div>

        <div className='flex items-center'>
          <div>
            <img className='h-[300px] w-[300px] rounded-[50%] p-4' src={user?.photoURL} alt="" />
          </div>

          <div className='flex flex-col flex-1 p-4'>
            <label  className="text-sm text-gray-600 dark:text-gray-200">User Name</label>
            <input 
              defaultValue={user?.displayName} 
              {...register("name")} 
              className="block w-full px-4 py-2 mb-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
            />
            <label  className="text-sm text-gray-600 dark:text-gray-200">Email</label>
            <input 
              defaultValue={user?.email} 
              {...register("email")} 
              readOnly
              className="block w-full px-4 py-2 mb-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
            />
            <label  className="text-sm text-gray-600 dark:text-gray-200">Photo URL</label>
            <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />

            {/* Change here with real info, here is dummy info for testing */}
            
            <label  className="text-sm text-gray-600 dark:text-gray-200">District</label>
            <input 
              defaultValue='Rangpur' 
              {...register("district")} 
              className="block w-full px-4 py-2 mb-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
            />
            <label  className="text-sm text-gray-600 dark:text-gray-200">Upazila</label>
            
            <input 
              defaultValue='Kaliganj' 
              {...register("upazila")} 
              className="block w-full px-4 py-2 mb-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
            />

            <input 
              defaultValue='O+' 
              {...register("bloodgroup")} 
              className="block w-full px-4 py-2 mb-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
            />

            <button 
              type="submit" 
              className='mt-6 btn btn-primary text-sm text-center text-gray-400' 
              disabled={disabled}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
