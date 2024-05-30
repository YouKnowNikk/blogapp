import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Blog } from "../models/blog.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
// Create Blog
export const createBlog = asyncHandler(async (req, res) => {
    const { title, description} = req.body;
    const userId = req.user._id;
  
    if (!title || !description ) {
      throw new ApiError(400, "All fields  are required");
    }
    const getcoverImage = req.file?.path;
    if (!getcoverImage) {
        throw new ApiError(400, "Cover Picture is required");
      }
      const coverImage = await uploadOnCloudinary(getcoverImage);
    const blog = await Blog.create({ title, description, coverImage:coverImage.url, user: userId });
  
    return res.status(201).json({
      success: true,
      data: blog,
      message: "Blog created successfully",
    });
  });
  

// Fetch All Blogs
export const fetchAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();

  return res.status(200).json({
    success: true,
    data: blogs,
    message: "All blogs fetched successfully",
  });
});

// Fetch Blogs by User
export const fetchBlogsByUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const blogs = await Blog.find({ user: userId });

  return res.status(200).json({
    success: true,
    data: blogs,
    message: "Blogs fetched successfully for the user",
  });
});

// Update Blog
export const updateBlog = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const blogId = req.params.id;
  const { title, description, coverImage } = req.body;

  const blog = await Blog.findOneAndUpdate(
    { _id: blogId, user: userId },
    { title, description, coverImage },
    { new: true }
  );

  if (!blog) {
    throw new ApiError(404, "Blog not found or user is not authorized to update");
  }

  return res.status(200).json({
    success: true,
    data: blog,
    message: "Blog updated successfully",
  });
});

// Delete Blog
export const deleteBlog = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const blogId = req.params.id;

  const blog = await Blog.findOneAndDelete({ _id: blogId, user: userId });

  if (!blog) {
    throw new ApiError(404, "Blog not found or user is not authorized to delete");
  }

  return res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
});
