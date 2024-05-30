import React, { useState } from 'react'; // Import useState
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createBlog } from '../features/blog/blogSlice';
import Navbar from './Navbar';

const CreateBlog = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [data, setData] = useState({}); // Define data state
    const [error,setError] = useState(false);
    const [coverImage,setCoverImage] = useState(null)
  const onSubmit = () => {
    // Dispatch action to create blog
    const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  formData.append("coverImage", coverImage);

  console.log(formData);
  dispatch(createBlog(formData)); 
  reset();
  };
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file && !["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setError("profilePicture", {
        type: "manual",
        message: "Only JPG, JPEG, and PNG files are allowed.",
      });
      setCoverImage(null);
    } else {
      setCoverImage(file);
    }
  };
  return (
    <div>
        <Navbar/>
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create a New Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setData({ ...data, title: e.target.value })} // Update data state
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            {...register("description", { required: "Description is required" })}
            className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            onChange={(e) => setData({ ...data, description: e.target.value })} // Update data state
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Image</label>
          <input
          className="mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          id="profilePicture"
          name="profilePicture"
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleProfilePictureChange}
          />
          {errors.coverImage && <p className="text-red-500">{errors.coverImage.message}</p>}
        </div>
        <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Create Blog</button>
      </form>
    </div>
    </div>
  );
};

export default CreateBlog;
