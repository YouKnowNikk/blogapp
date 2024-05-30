import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const login = createAsyncThunk('auth/login', async (userCredentials, { rejectWithValue }) => {
    try {
        const response = await axios.post('/users/login', userCredentials, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;
            return rejectWithValue({ status, message: data.message || 'Login failed' });
        } else {
            return rejectWithValue({ message: 'Network error' });
        }
    }
});

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post('users/register', userData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    await axios.post('users/logout',{
      withCredentials:true
    });
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.data;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = 'idle';
                state.user = null;
                state.token = null;
            });
    },
});

export default authSlice.reducer;
