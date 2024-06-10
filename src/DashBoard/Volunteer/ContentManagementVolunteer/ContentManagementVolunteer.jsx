import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import 'aos/dist/aos.css'
import Aos from "aos";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const ContentManagementVolunteer = () => {



  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    Aos.init();
  },[])
  const [statusFilter, setStatusFilter] = useState('all');


  const { isPending, isError, error, refetch,  data: blogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await axiosPublic.get('/blog');
      return res.data;
    }
  });



  if (isPending) {
    return <div className="mx-auto container flex justify-center"><span className="loading loading-dots loading-lg"></span></div>;
  }

  console.log(blogs)
  if (isError) {
    return <p>Error: {error.message}</p>;
  }








  const filteredBlogs = statusFilter === 'all' ? blogs : blogs?.filter(blog => blog?.status === statusFilter);



  return (
    <div>

    <Helmet>
      <meta charSet="utf-8" />
      <title>Content Management - Life Stream Donate</title>

      </Helmet>
     <div className='flex justify-between my-10 '>
     <h2 className='text-2xl'>Add A New Blog</h2>
     <Link to='/dashboard/addblogs'><button className='btn'>Add Blogs</button></Link>
     </div>

     <div className='flex justify-center p-10 border-b-[1px] rounded-xl mb-36'>
      <h2 className='text-2xl '>Manage All The Blogs</h2>
     </div>

     <div className='flex justify-end mb-20'>
      <select 
      className='select select-bordered'
      value={statusFilter}
      onChange={e => setStatusFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
      </select>
     </div>


     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-16 items-center'>
     {
      filteredBlogs?.map(blog => 
      <div key={blog._id} data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500" >
        <div className="mx-auto hover:scale-110 duration-1000 transition-all bg-[#1b1b1b] w-[90%] xl:w-[450px]">
        <img className=" h-[350px] w-full" src={blog?.image} alt="" />
       
       <div className="flex-col md:flex lg:flex xl:flex justify-between items-center">

       <div className="flex text-white gap-2 flex-col items-start p-8 bg-[#1b1b1b] opacity-70">
        <p className="text-lg text-orange-500 mb-2">{blog?.title}</p>
        <p className="font-extrabold">Content:   <span className="text-[14px] text-gray-400">{blog?.content.split(' ').slice(0, 50).join(' ') + '......'}</span></p>

        </div>
        <div className="p-8 items-center flex flex-col gap-8">
       <Link to={`/dashboard/blogdetailsvolunteer/${blog?._id}`}> <button className="text-gray-400 btn border-orange-400 bg-inherit hover:text-white hover:font-bold hover:border-orange-500 transition-all">View Details</button></Link>

       <Link to={`/dashboard/blogeditvolunteer/${blog?._id}`}> <button className="text-gray-400 btn border-orange-400 bg-inherit hover:text-white hover:font-bold hover:border-orange-500 transition-all">Edit</button></Link>
       
        </div>
       </div>
        
        </div>
        </div>)
     }
     </div>




    </div>
  );
};

export default ContentManagementVolunteer;