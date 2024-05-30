import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('blogapp/blogs');
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const fetchUserBlogs = createAsyncThunk('blogs/fetchUserBlogs', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('blogapp/blogs/user');
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const createBlog = createAsyncThunk('blogs/createBlog', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post('blogapp/blogs', formData,{
      withCredentials:true
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateBlog = createAsyncThunk('blogs/updateBlog', async ({ id, blogData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`blogapp/blogs/${id}`, blogData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`blogapp/blogs/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const fetchBlogById = createAsyncThunk('blogs/fetchBlogById', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`blogapp/blogs/${id}`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    userBlogs: [],
    selectedBlog: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs.push(action.payload.data);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchUserBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userBlogs = action.payload;
      })
      .addCase(fetchUserBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.blogs.findIndex(blog => blog._id === action.payload.data._id);
        state.blogs[index] = action.payload.data;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
