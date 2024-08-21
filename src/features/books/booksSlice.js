import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBooks, addBook, updateBook, deleteBook, addReview as apiAddReview } from '../../api';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await getBooks();
  return response.data;
});

export const createBook = createAsyncThunk('books/createBook', async (book, { getState }) => {
  const response = await addBook(book.title, book.author, book.description, book.image);
  return response.data;
});


export const modifyBook = createAsyncThunk('books/modifyBook', async (book) => {
  const response = await updateBook(book.id, book.title, book.author, book.description, book.image);
  return response.data;
});


export const removeBook = createAsyncThunk('books/removeBook', async (bookId) => {
  await deleteBook( bookId);
  return bookId;
});


export const addReview = createAsyncThunk('books/addReview', async ({ bookId, review }) => {
    const response = await apiAddReview(bookId, review);
    return response.data;
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(modifyBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(book => book.id === action.payload.id);
        state.books[index] = action.payload;
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.books = state.books.filter(book => book.id !== action.payload);
      })
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        // Find the book and update its reviews
        const book = state.books.find(book => book.id === action.payload.bookId);
        if (book) {
          book.reviews.push(action.payload.review);
        }
      });
  },
});

export default booksSlice.reducer;
