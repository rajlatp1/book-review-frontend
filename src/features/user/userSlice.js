import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authenticate, register } from '../../api';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    role: JSON.parse(localStorage.getItem('role')) || null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('role', JSON.stringify(action.payload.role));
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export const loginUser = createAsyncThunk('user/loginUser', async ({ username, password }, { dispatch }) => {
  const response = await authenticate(username, password);
  dispatch(setUser({ user: response.data.user, token: response.data.token, role:response.data.role }));
});

export const registerUser = createAsyncThunk('user/registerUser', async ({ username, password }) => {
  await register(username, password);
});

export default userSlice.reducer;
