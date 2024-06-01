import React from 'react';
import { Link } from 'react-router-dom';

const ContentManagement = () => {
  return (
    <div>
      <h2>Here Admin can Manage Items</h2>
      <button><Link to='/dashboard/addblogs'>Add Blogs</Link></button>
    </div>
  );
};

export default ContentManagement;