import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBlogById, updateBlog } from '../features/blog/blogSlice';

const EditBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogs.selectedBlog);
  const status = useSelector((state) => state.blogs.status);
  const error = useSelector((state) => state.blogs.error);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    coverImage: ''
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        description: blog.description,
        coverImage: blog.coverImage,
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBlog({ id, blogData: formData }));
  };

  if (status === 'loading') {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center mt-8">Error: {error}</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image</label>
          <input
            type="text"
            id="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
          <img src={formData.coverImage} alt={formData.title} className="mt-2 w-full h-auto" />
        </div>
        <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Save Changes</button>
      </form>
    </div>
  );
};

export default EditBlog;
