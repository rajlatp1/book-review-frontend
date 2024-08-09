import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addReview } from '../features/books/booksSlice';
import { getBook } from '../api';
import AddReview from '../components/AddReview';
import { Grid, Card, CardMedia, CardContent, Typography, List, ListItem, Box } from '@mui/material';

const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    getBook(id).then(response => {
      setBook(response.data.book);
      setReviews(response.data.reviews);
    });
  }, [id]);

  const handleAddReview = (review) => {
    const token = localStorage.getItem('token');
    dispatch(addReview({ token, bookId: id, review })).then(response => {
      setReviews([...reviews, { review, username: 'Current User' }]);
    });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card elevation={0}>
            <CardMedia
              component="img"
              alt={book.title}
              image={book.image_link}
              style={{
                height: '400px',
                objectFit: 'contain'
              }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card elevation={0}>
            <CardContent>
              <Typography variant="h4" component="div" sx={{ mb: 2 }}>
                {book.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                {book.author}
              </Typography>
              <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                {book.description}
              </Typography>
              <Typography variant="body1" component="p" sx={{ mb: 2 }}>
                {user && <AddReview onAddReview={handleAddReview} />}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sx={{ m: 6 }}>
          <Typography variant="h5" component="div">
            Reviews
          </Typography>
          <List>
            {reviews.map((review, index) => (
              <ListItem key={index}>
                <div>
                  <Typography variant="body2" component="p">
                    {review.username}:
                  </Typography>
                  <Typography variant="body2" component="p">
                    {review.review}
                  </Typography>
                </div>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookPage;
