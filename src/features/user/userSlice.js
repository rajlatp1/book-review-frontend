import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authenticate, register, getUserInfo, logout as logoutAPI } from '../../api';


// Thunk to handle user login
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await authenticate(username, password);
      if (response.status === 200) {
        dispatch(setUser({ user: response.data.user, role: response.data.role }));
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'An unexpected error occurred.');
    }
  }
);


// Thunk to handle user registration
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await register(username, password);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed.');
    }
  }
);


// Thunk to fetch user info on page load
export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserInfo();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user info.');
    }
  }
);


// Thunk to handle user logout
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    await logoutAPI();  // Call the API to expire the cookie
    dispatch(logout()); // Clear the user from Redux state
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    role: null,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.role = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.user = action.payload.username;
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setUser, logout } = userSlice.actions;


export default userSlice.reducer;
