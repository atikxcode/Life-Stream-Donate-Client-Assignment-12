import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import './Blog.css'
import { Helmet } from 'react-helmet';

const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);

  const { isLoading, isError, error, data: blogs } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await axiosPublic.get('/blog');
      return res.data;
    }
  });

  if (isLoading) {
    return <div className="mx-auto container flex justify-center"><span className="loading loading-dots loading-lg"></span></div>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const filteredBlogs = blogs.filter(blog => blog.status === 'published');

  const handleNextBlog = () => {
    setCurrentBlogIndex((prevIndex) => (prevIndex + 1) % filteredBlogs.length);
  };

  const handlePreviousBlog = () => {
    setCurrentBlogIndex((prevIndex) => (prevIndex - 1 + filteredBlogs.length) % filteredBlogs.length);
  };

  const currentBlog = filteredBlogs[currentBlogIndex];

  return (
    <div className="blog-page mx-auto container flex flex-col items-center">
       <Helmet>
      <meta charSet="utf-8" />
      <title>Blog - Life Stream Donate</title>

      </Helmet>
      {filteredBlogs.length > 0 ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">{currentBlog.title}</h1>
          <img src={currentBlog.image} alt={currentBlog.title} className="mb-4 max-w-full h-auto" />
          <p className="mb-4">{currentBlog.content}</p>

          <div className="blog-navigation mt-4 flex justify-between">
            {filteredBlogs.length > 1 && (
              <>
                {currentBlogIndex > 0 && (
                  <button onClick={handlePreviousBlog} className="previous-button px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Previous Blog
                  </button>
                )}
                {currentBlogIndex < filteredBlogs.length - 1 && (
                  <button onClick={handleNextBlog} className="next-button px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Next Blog
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <p>No published blogs available.</p>
      )}
    </div>
  );
};

export default Blog;
