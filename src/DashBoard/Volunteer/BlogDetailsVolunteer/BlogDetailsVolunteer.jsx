import React, { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import 'aos/dist/aos.css'
import Aos from "aos";
import { Helmet } from 'react-helmet';


const BlogDetailsVolunteer = () => {
  const blog = useLoaderData();

  useEffect(() => {
    Aos.init();
  },[])

  const {_id, content, image, title, status} = blog

  return (
    <div>
      <Helmet>
      <meta charSet="utf-8" />
      <title>Blog Details - Life Stream Donate</title>

      </Helmet>
    <div className="w-full mx-auto container my-32"  data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500" >
       <div className=" bg-[#1b1b1b]">
        
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">

       
        <img className="w-full h-auto " src={image} alt="" />
        
        
        <div className="flex flex-col justify-between items-center text-white ">

        <div className="flex flex-col   h-full items-start p-8 bg-[#1b1b1b] opacity-70">
         <div className="flex flex-col gap-8  justify-center  w-full">

         <p className="text-2xl mb-2 text-orange-500">{title}</p>
         <p className="text-[14px] mb-2 text-orange-500 w-[800px]">Content: {content}</p>
         
         </div>
         
         
         </div>
         <div className="p-8 items-center flex">
         <Link to={`/dashboard/blogEdit/${_id}`}><button className="text-gray-400 btn border-orange-400 bg-inherit hover:text-white hover:font-bold hover:border-orange-500 transition-all">Edit</button></Link>
       </div>
         
        </div>
        </div>
         
         </div>
       </div>
 </div>
  );
};

export default BlogDetailsVolunteer;