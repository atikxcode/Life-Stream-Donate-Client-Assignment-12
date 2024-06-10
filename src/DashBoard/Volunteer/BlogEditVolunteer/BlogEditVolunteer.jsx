import React, { useRef, useState } from 'react';
import { Controller,  useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;



const BlogEditVolunteer = () => {

  const blog = useLoaderData();

  // console.log(blog)

  const {_id, title, content, image} = blog;




  const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
  const axiosPublic = useAxiosPublic();

  const editor = useRef(null);
	const [contents, setContents] = useState('');

  const extractTextFromHTML = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.textContent || "";
  };

  const onSubmit = async (data) => {
    // console.log(data);
    
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });


    if (res.data.success) {
      const plainTextContent = extractTextFromHTML(data.content);
      

      const UpdatedBlog = {
        title: data.title,
        image: res.data.data.display_url,
        content: plainTextContent,
      
      };

      // console.log(UpdatedBlog)
      axiosPublic.put(`/blog/${_id}`, UpdatedBlog)
      .then(res => {
        if(res.data.modifiedCount > 0){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Updated The Blog Successfully",
            showConfirmButton: false,
            timer: 1500,
            
          });
          // reset()
        } 
      })
      .catch(error => {
        console.error(error)
      })

     
    }
  };



  return (
    <div>
      <Helmet>
      <meta charSet="utf-8" />
      <title>Blog Edit - Life Stream Donate</title>

      </Helmet>
      <div className='my-10 flex justify-center'>
        <h2 className='text-4xl'>Post A Blog</h2>
      </div>

<div>
<form  onSubmit={handleSubmit(onSubmit)}>

<div className="mb-4">
    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" >Blog Title</label>
    <input defaultValue={title} {...register("title", { required: true })} type="text"  name="title" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" />
</div>


<div>
<label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Thumbnail Image</label>
<input  {...register("image", { required: true })} type="file" name="image" placeholder="Image URL" className="block w-full px-4 py-2 mb-4 b text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" required />
</div>


      <div className='mb-4'>
       <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Blog Content</label>
      
      <Controller
      defaultValue={content}
      control={control}
      name='content'
      rules={{required: true}}
      render={({field}) => (

      <JoditEditor
			ref={editor}
			value={content || contents}
			
			tabIndex={1} 
			onBlur={newContent => setContents(newContent)} 
			onChange={field.onChange}
		/>
 
       
      )}
      
      />
     
       </div>



      <button className='btn  mt-4 bg-white text-black hover:text-white w-full'>Update</button>
  {/* <input type="submit" className="btn mt-4 bg-white text-black hover:text-white w-full" /> */}
    

</form>
</div>
    </div>
  );
};

export default BlogEditVolunteer;