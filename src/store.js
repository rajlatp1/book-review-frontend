import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import booksReducer from './features/books/booksSlice';
import cartReducer from './features/cart/cartSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    books: booksReducer,
    cart: cartReducer,
  },
});


export default store;