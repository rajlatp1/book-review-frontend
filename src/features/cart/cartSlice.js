import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCartItems, addToCart, removeCartItem } from '../../api';


// Async thunk to load cart items
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (user) => {
  const response = await getCartItems(user);
  return response.data;
});


// Async thunk to add an item to the cart
export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({ bookId, quantity }) => {
  await addToCart({bookId, quantity });
  const response = await getCartItems();
  return response.data;
});


// Async thunk to remove an item from the cart
export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async ({itemId }) => {
  await removeCartItem(itemId);
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