import React from 'react';
import { Link } from 'react-router-dom';

const ContentManagement = () => {
  return (
    <div>

     <div className='flex justify-between my-10'>
     <h2 className='text-2xl'>Add A New Blog</h2>
     <Link to='/dashboard/addblogs'><button className='btn'>Add Blogs</button></Link>
     </div>

     <div>
      <h2>Here will be all the Published blog</h2>
     </div>

    </div>
  );
};

export default ContentManagement;