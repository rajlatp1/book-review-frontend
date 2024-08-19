import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';


const AddReview = ({ onAddReview }) => {
  const [review, setReview] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (review.trim()) {
      onAddReview(review);
      setReview('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Review"
          fullWidth
          margin="normal"
          placeholder="Write your review here..."
          multiline
          rows={4}
          value={review}
          onChange={e => setReview(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddReview;
