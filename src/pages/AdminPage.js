import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, createBook, removeBook, modifyBook } from '../features/books/booksSlice';
import AddBook from '../components/AddBook';
import EditBook from '../components/EditBook';
import { Box, Button, Typography, Paper } from '@mui/material';

const AdminPage = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const [currentView, setCurrentView] = useState(''); 


  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleAddBook = (title, author, description, image) => {
    dispatch(createBook({ title, author, description, image }));
  };

  const handleDeleteBook = (bookId) => {
    dispatch(removeBook(bookId));
  };

  const handleUpdateBook = (bookId, title, author, description, image) => {
    dispatch(modifyBook({ id: bookId, title, author, description, image }));
  };

  const handleAddBookClick = () => {
    setCurrentView('add');
  };

  const handleManageBookClick = () => {
    setCurrentView('manage');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={4} component={Paper} elevation={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Panel
      </Typography>
      <Box display="flex" gap={2} mb={4}>
        <Button variant="contained" color="primary" onClick={handleAddBookClick}>
          Add Book
        </Button>
        <Button variant="contained" color="secondary" onClick={handleManageBookClick}>
          Manage Books
        </Button>
      </Box>
      {currentView === 'add' && <AddBook onAddBook={handleAddBook} />}
      {currentView === 'manage' && <EditBook onUpdateBook={handleUpdateBook} books={books} onDeleteBook={handleDeleteBook} />}
    </Box>
  );
};

export default AdminPage;
