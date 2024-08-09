import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import booksReducer from './features/books/booksSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    books: booksReducer,
  },
});

export default store;
