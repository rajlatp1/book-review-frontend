import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EditBook = ({ onUpdateBook, books, onDeleteBook }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setDescription(book.description);
    setImage(book.image_link);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateBook(selectedBook.id, title, author, description, image);
    setSelectedBook(null);
    setTitle('');
    setAuthor('');
    setDescription('');
    setImage('');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" bgcolor="background.default" width="1000px">
      <Paper elevation={3} style={{ padding: '2rem', width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Manage Books
        </Typography>
        <List>
          {books.map((book) => (
            <ListItem key={book.id} disablePadding>
              <ListItemText primary={book.title} />
              <IconButton onClick={() => handleSelectBook(book)} aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDeleteBook(book.id)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
              {selectedBook && selectedBook.id === book.id && (
                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
                  <TextField
                    label="Title"
                    fullWidth
                    margin="normal"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
                    label="Author"
                    fullWidth
                    margin="normal"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                  <TextField
                    label="Description"
                    fullWidth
                    margin="normal"
                    placeholder="Description"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <TextField
                    label="Image"
                    fullWidth
                    margin="normal"
                    placeholder="Image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '1rem' }}
                  >
                    Update Book
                  </Button>
                </form>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default EditBook;
