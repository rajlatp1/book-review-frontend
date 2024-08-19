import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addReview } from '../features/books/booksSlice';
import { getBook } from '../api';
import { addItemToCart } from '../features/cart/cartSlice';
import AddReview from '../components/AddReview';
import LoginDialog from '../components/LoginDialog';
import { Grid, Card, CardMedia, CardContent, Typography, List, ListItem, Box, Button, Modal, Pagination, IconButton, MenuItem, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const reviewsPerPage = 5;


  useEffect(() => {
    getBook(id).then(response => {
      setBook(response.data.book);
      setReviews(response.data.reviews);
    });
  }, [id]);


  const handleAddReview = (review) => {
    const token = localStorage.getItem('token');
    dispatch(addReview({ token, bookId: id, review })).then(response => {
      setReviews([...reviews, { review, user: user }]);
      setOpenModal(false);
    });
  };


  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
    if (user) {
      dispatch(addItemToCart({ token, bookId: id, quantity })).then(() => {
        alert('Book added to cart successfully!');
      }).catch(err => {
        console.error('Error adding book to cart:', err);
        alert('Failed to add book to cart.');
      });
    } else {
      setLoginDialogOpen(true);
    }
  };


  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = '/checkout';
  };


  const handleOpenModal = () => {
    if (user) {
      setOpenModal(true);
    } else {
      setLoginDialogOpen(true);
    }
  };


  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const handleLoginSuccess = () => {
    setLoginDialogOpen(false);
    setOpenModal(true);  // Only opens the review modal if login was triggered by adding a review
  };


  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);


  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card elevation={0}>
            <CardMedia
              component="img"
              alt={book.title}
              image={book.image_link}
              style={{ height: '400px', objectFit: 'contain' }}
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ mr: 2 }}>
                  ₹{book.price}
                </Typography>
                <Select
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  variant="outlined"
                  size="small"
                >
                  {[...Array(book.stock).keys()].map((q) => (
                    <MenuItem key={q + 1} value={q + 1}>
                      {q + 1}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Button variant="contained" onClick={handleAddToCart} sx={{ mr: 2 }}>
                Add to Cart
              </Button>
              <Button variant="contained" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} display="flex" flexDirection="column" alignItems="center">
          <Button variant="contained" onClick={handleOpenModal} sx={{ mb: 2 }}>
            Add Review
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" component="div">
            Reviews
          </Typography>
          <List>
            {currentReviews.map((review, index) => (
              <ListItem key={index}>
                <div>
                  <Typography variant="body2" component="p">
                    {review.user}:
                  </Typography>
                  <Typography variant="body2" component="p">
                    {review.review}
                  </Typography>
                </div>
              </ListItem>
            ))}
          </List>
          <Pagination
            count={Math.ceil(reviews.length / reviewsPerPage)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            sx={{ mt: 2 }}
          />
        </Grid>
      </Grid>


      {/* Add Review Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="add-review-modal"
        aria-describedby="modal-for-adding-review"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 4, boxShadow: 24, borderRadius: 2, width: 400 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Add Review</Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <AddReview onAddReview={handleAddReview} />
        </Box>
      </Modal>


      {/* Login Dialog */}
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onRegisterSuccess={() => setLoginDialogOpen(false)}
      />
    </Box>
  );
};


export default BookPage;
