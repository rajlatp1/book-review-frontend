import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const AddReview = ({ onAddReview }) => {
  const [review, setReview] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddReview(review);
    setReview('');
  };

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Add Review
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Review" fullWidth margin="normal" placeholder="Review" multiline rows={4} value={review} onChange={e => setReview(e.target.value)} />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddReview;
