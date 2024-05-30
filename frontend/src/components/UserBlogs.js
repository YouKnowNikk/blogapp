import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserBlogs,deleteBlog } from '../features/blog/blogSlice';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const UserBlogs = () => {
  const dispatch = useDispatch();
  const userBlogs = useSelector((state) => state.blogs.userBlogs);
  const status = useSelector((state) => state.blogs.status);
  const error = useSelector((state) => state.blogs.error);

  useEffect(() => {
    dispatch(fetchUserBlogs());
  }, [dispatch]);
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteBlog(id));
      dispatch(fetchUserBlogs());
    }
  };
  if (status === 'loading') {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center mt-8">Error: {error}</div>;
  }

  return (
    <div>
        <Navbar/>
        <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">User Specific Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userBlogs.map((blog) => (
          <div key={blog._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={blog.coverImage} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-700">{blog.description}</p>
              <div className="mt-4 flex justify-end">
              <Link to={`/editBlog/${blog._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                    Edit
                  </Link>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={()=>handleDelete(blog._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default UserBlogs;
