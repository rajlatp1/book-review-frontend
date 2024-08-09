import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const AddBook = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    onAddBook(title, author, description, image);
    setTitle('');
    setAuthor('');
    setDescription('');
    setImage('');
  };

  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    bgcolor="background.default"
    >
    <Paper elevation={3} style={{ padding: '2rem', maxWidth: '400px', width: '100%' }}>
        <Typography variant="h5" gutterBottom>
        Add Book
        </Typography>
        <form onSubmit={handleSubmit}>
        <TextField label="Title" fullWidth margin="normal" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <TextField label="Author" fullWidth margin="normal" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
        <TextField label="Description" fullWidth margin="normal" placeholder="Description" multiline rows={4} value={description} onChange={e => setDescription(e.target.value)} />
        <TextField label="Image" fullWidth margin="normal" placeholder="Image" value={image} onChange={e => setImage(e.target.value)} />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
        Add Book
        </Button>
        </form>
    </Paper>
    </Box>
  );
};

export default AddBook;
