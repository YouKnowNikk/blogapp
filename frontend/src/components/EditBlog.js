import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateBlog } from '../features/blog/blogSlice';

const EditBlog = () => {
  const { id } = useParams();
  console.log(id)
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogs.selectedBlog);
  const status = useSelector((state) => state.blogs.status);
  const error = useSelector((state) => state.blogs.error);

  useEffect(() => {
    dispatch(updateBlog(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center mt-8">Error: {error}</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={blog?.title}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={blog?.description}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image</label>
          <img src={blog?.coverImage} alt={blog?.title} className="mt-2 w-full h-auto" />
        </div>
        <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Save Changes</button>
      </form>
    </div>
  );
};

export default EditBlog;
