import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../features/blog/blogSlice';
import Blog from './BlogCard';
import Navbar from './Navbar';
const Home = () => {
    const dispatch = useDispatch();
    const { blogs, status, error } = useSelector((state) => state.blogs);
  
    useEffect(() => {
      dispatch(fetchBlogs());
    }, [dispatch]);
  
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div>
        <Navbar/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {blogs.length===0 && <p>No Blogs Right Now</p> }
        {blogs.map((blog) => (
          <Blog key={blog.id} {...blog} />
        ))}
      </div>
      </div>
    );
  };
  
  export default Home;