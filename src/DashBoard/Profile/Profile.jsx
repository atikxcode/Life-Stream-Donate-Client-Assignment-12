import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../Pages/Provider/AuthProvider';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {

  const axiosPublic = useAxiosPublic();
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [districtName, setDistrictName] = useState('')




  const { user } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true);


  const { data: userDetails } = useQuery({
    queryKey: ['userDetails'],
    queryFn: async () => {
      const res = await axiosPublic.get('/user');
      return res.data;
    }
  });
 



  const buttonUnlock = (e) => {
    e.preventDefault();
    setDisabled(!disabled);
  };

  const { register, handleSubmit, formState: { errors }} = useForm();




  const { isPending, isError, error, refetch,  data: upazilas } = useQuery({
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



  if (isPending) {
    return <div className="mx-auto container flex justify-center"><span className="loading loading-dots loading-lg"></span></div>;
  }

  

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const filteredUpazilas = upazilas.filter(upazila => upazila.district_id == selectedDistrictId);
  
  const currentUser = userDetails.filter(users => users?.email == user?.email)

  console.log(currentUser)


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
                bloodgroup: data.bloodType,
                district: districtName,
                upazila: data.upazila,
                image: res.data.data.display_url
      }

      
      axiosPublic.put(`/user/${currentUser[0]?._id}`)
      .then(res => {
        if(res.data.modifiedCount > 0){
          console.log("user Information Updated Successfully")
        }
      })

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
            <img className='h-[300px] w-[300px] rounded-[50%] p-4' src={currentUser[0]?.image} alt="" />
          </div>

          <div className='flex flex-col flex-1 p-4'>
            <label  className="text-sm text-gray-600 dark:text-gray-200">User Name</label>
            <input 
              defaultValue={currentUser[0]?.name} 
              {...register("name")} 
              className="block w-full px-4 py-2 mb-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
            />
            <label  className="text-sm text-gray-600 dark:text-gray-200">Email</label>
            <input 
              defaultValue={currentUser[0]?.email} 
              {...register("email")} 
              readOnly
              className="block w-full px-4 py-2 mb-4 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
            />
            <label  className="text-sm text-gray-600 dark:text-gray-200">Photo URL</label>
            <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />

            {/* Change here with real info, here is dummy info for testing */}
            
            <label  className="text-sm text-gray-600 dark:text-gray-200">District</label>
        <select  {...register("district", { required: true })} name="district" 

        onChange={ (e) => {
        const [id, name] = e.target.value.split(',');
        setSelectedDistrictId(id)
        setDistrictName(name)
        }} 
        className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" >
        <option value={currentUser[0]?.district}>{currentUser[0]?.district}</option>
        {districts.map(district => (
        <option key={district._id} value={`${district.division_id}, ${district.name}`}>
        {district.name}
        </option>
        ))}
        </select>

        <label  className="text-sm text-gray-600 dark:text-gray-200">Upazila</label>
            
          <select {...register("upazila", { required: true })} name="upazila" className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" >
          <option value={currentUser[0]?.upazila}>{currentUser[0]?.upazila}</option>
          {filteredUpazilas.map(upazila => (
          <option key={upazila._id} value={upazila.name}>
          {upazila.name}
          </option>
          ))}
          </select>


          <label  className="text-sm text-gray-600 dark:text-gray-200">Blood Group</label>
          <select {...register("bloodType")} name="bloodType" className="block w-full px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required>
          <option value={currentUser[0]?.bloodgroup}>{currentUser[0]?.bloodgroup}</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          </select>

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
