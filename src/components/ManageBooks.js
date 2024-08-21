import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, IconButton, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { getBooks, addBook, updateBook, deleteBook, searchBook } from '../api';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);


  useEffect(() => {
    getBooks().then((response) => setBooks(response.data));
  }, []);


  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };


  const handleSearch = () => {
    searchBook(searchTerm).then((response) => setSearchResults(response.data));
  };


  const handleAddBook = () => {
    const book = {
      title: currentBook.title,
      author: currentBook.author,
      description: currentBook.description,
      price: currentBook.price,
      stock: currentBook.stock,
      image: currentBook.image_link,
    };
    addBook(book.title, book.author, book.description, book.price, book.stock, book.image).then((response) => {
      setBooks([...books, response.data]);
      setCurrentBook(null);
      setOpenDialog(false);
    });
  };


  const handleEditBook = (bookId) => {
    const book = {
      id: bookId,
      title: currentBook.title,
      author: currentBook.author,
      description: currentBook.description,
      price: currentBook.price,
      stock: currentBook.stock,
      image: currentBook.image_link,
    };
    updateBook(book.id, book.title, book.author, book.description, book.price, book.stock, book.image).then((response) => {
      const updatedBooks = books.map((b) => (b.id === bookId ? response.data : b));
      setBooks(updatedBooks);
      setCurrentBook(null);
      setOpenDialog(false);
    });
  };


  const handleDeleteBook = () => {
    deleteBook(bookToDelete.id).then(() => {
      setBooks(books.filter((book) => book.id !== bookToDelete.id));
      setBookToDelete(null);
      setOpenConfirmDialog(false);
    });
  };


  const handleOpenDialog = (book = null) => {
    setCurrentBook(book);
    setOpenDialog(true);
  };


  const handleCloseDialog = () => {
    setCurrentBook(null);
    setOpenDialog(false);
  };


  const handleOpenConfirmDialog = (book) => {
    setBookToDelete(book);
    setOpenConfirmDialog(true);
  };


  const handleCloseConfirmDialog = () => {
    setBookToDelete(null);
    setOpenConfirmDialog(false);
  };


  return (
    <Box>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        centered
        variant="scrollable"
        sx={{ justifyContent: 'start' }}
      >
        <Tab label="Add Book" />
        <Tab label="Edit/Delete Book" />
      </Tabs>


      {currentTab === 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add a New Book
          </Typography>
          <TextField label="Title" fullWidth margin="normal" value={currentBook?.title || ''} onChange={(e) => setCurrentBook({ ...currentBook, title: e.target.value })} />
          <TextField label="Author" fullWidth margin="normal" value={currentBook?.author || ''} onChange={(e) => setCurrentBook({ ...currentBook, author: e.target.value })} />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={currentBook?.description || ''}
            onChange={(e) => setCurrentBook({ ...currentBook, description: e.target.value })}
            multiline
            rows={4}
          />
          <TextField label="Price" fullWidth margin="normal" value={currentBook?.price || ''} onChange={(e) => setCurrentBook({ ...currentBook, price: e.target.value })} />
          <TextField label="Stock" fullWidth margin="normal" value={currentBook?.stock || ''} onChange={(e) => setCurrentBook({ ...currentBook, stock: e.target.value })} />
          <TextField label="Image Link" fullWidth margin="normal" value={currentBook?.image_link || ''} onChange={(e) => setCurrentBook({ ...currentBook, image_link: e.target.value })} />
          <Button variant="contained" color="primary" fullWidth onClick={handleAddBook} sx={{ mt: 2 }}>
            Add Book
          </Button>
        </Box>
      )}


      {currentTab === 1 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Search and Edit/Delete Books
          </Typography>
          <Box sx={{ display: 'flex', mb: 2 }}>
            <TextField
              label="Search Book"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
            <IconButton onClick={handleSearch} color="primary">
              <SearchIcon />
            </IconButton>
          </Box>
          <List>
            {searchResults.map((book) => (
              <ListItem key={book.id}>
                <ListItemText primary={book.title} secondary={`${book.author} - ${book.price}`} />
                <IconButton color="primary" onClick={() => handleOpenDialog(book)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleOpenConfirmDialog(book)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}


      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentBook?.id ? 'Edit Book' : 'Add Book'}</DialogTitle>
        <DialogContent>
          <TextField label="Title" fullWidth margin="normal" value={currentBook?.title || ''} onChange={(e) => setCurrentBook({ ...currentBook, title: e.target.value })} />
          <TextField label="Author" fullWidth margin="normal" value={currentBook?.author || ''} onChange={(e) => setCurrentBook({ ...currentBook, author: e.target.value })} />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={currentBook?.description || ''}
            onChange={(e) => setCurrentBook({ ...currentBook, description: e.target.value })}
            multiline
            rows={4}
          />
          <TextField label="Price" fullWidth margin="normal" value={currentBook?.price || ''} onChange={(e) => setCurrentBook({ ...currentBook, price: e.target.value })} />
          <TextField label="Stock" fullWidth margin="normal" value={currentBook?.stock || ''} onChange={(e) => setCurrentBook({ ...currentBook, stock: e.target.value })} />
          <TextField label="Image Link" fullWidth margin="normal" value={currentBook?.image_link || ''} onChange={(e) => setCurrentBook({ ...currentBook, image_link: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={currentBook?.id ? () => handleEditBook(currentBook.id) : handleAddBook} color="primary">
            {currentBook?.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>


      {/* Confirmation Dialog */}
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Delete Book</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete the book "{bookToDelete?.title}"?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteBook} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};


export default ManageBooks;