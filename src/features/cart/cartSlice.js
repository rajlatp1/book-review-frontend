import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCartItems, addToCart, removeCartItem } from '../../api';


export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
  const response = await getCartItems();
  return response.data;
});


export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({ token, bookId, quantity }) => {
  await addToCart({ token, bookId, quantity });
  const response = await getCartItems();
  return response.data;
});


export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async ({ token, itemId }) => {
  await removeCartItem(token, itemId);
  return itemId;
});


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;