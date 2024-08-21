import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const AddReviewModal = ({ open, handleClose, handleAddReview }) => {
  const [review, setReview] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    if (review.trim()) {
      handleAddReview(review);
      setReview('');  
    }
  };


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-review-modal"
      aria-describedby="modal-for-adding-review"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 4, boxShadow: 24, borderRadius: 2, width: 400 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Add Review</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Review"
            fullWidth
            margin="normal"
            placeholder="Write your review here..."
            multiline
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddReviewModal;
