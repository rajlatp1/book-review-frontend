import React, { useState } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { searchBook, deleteReview, getBookReviews } from '../api';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';


const ManageReviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [book, setBook] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);


  const handleSearch = () => {
    searchBook(searchTerm).then((response) => {
      setSearchResults(response.data);
    });
  };


  const handleSelectBook = (book) => {
    setBook(book);
    getBookReviews(book.id).then((reviews) => {
      setReviews(Array.isArray(reviews.data) ? reviews.data : []);
    });
  };


  const handleOpenConfirmDialog = (review) => {
    setReviewToDelete(review);
    setOpenConfirmDialog(true);
  };


  const handleCloseConfirmDialog = () => {
    setReviewToDelete(null);
    setOpenConfirmDialog(false);
  };


  const handleDeleteReview = () => {
    deleteReview(reviewToDelete.id).then(() => {
      setReviews(reviews.filter((r) => r.id !== reviewToDelete.id));
      handleCloseConfirmDialog();
    });
  };


  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Search Book to Manage Reviews
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
          <ListItem key={book.id} button onClick={() => handleSelectBook(book)}>
            <ListItemText primary={book.title} secondary={`${book.author}`} />
          </ListItem>
        ))}
      </List>


      {book && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Reviews for "{book.title}"
          </Typography>
          {reviews.length > 0 ? (
            <List>
              {reviews.map((review) => (
                <ListItem key={review.id}>
                  <ListItemText primary={review.review} secondary={`By: ${review.user}`} />
                  <IconButton color="secondary" onClick={() => handleOpenConfirmDialog(review)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No reviews found for this book.
            </Typography>
          )}
        </Box>
      )}


      {/* Confirmation Dialog */}
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Delete Review</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this review?</Typography>
          <Typography variant="body2">{reviewToDelete?.review}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteReview} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};


export default ManageReviews;
