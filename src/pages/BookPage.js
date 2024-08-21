import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addReview } from '../features/books/booksSlice';
import { getBook } from '../api';
import { addItemToCart } from '../features/cart/cartSlice';
import BookDetails from '../components/BookDetails';
import ReviewSection from '../components/ReviewSection';
import AddReviewModal from '../components/AddReviewModal';
import { Grid, Box, Pagination, Button } from '@mui/material';
import LoginDialog from '../components/LoginDialog';


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
    dispatch(addReview({ bookId: id, review })).then(() => {
      setReviews([...reviews, { review, user }]);
      setOpenModal(false);
    });
  };


  const handleAddToCart = () => {
    if (user) {
      dispatch(addItemToCart({bookId: id, quantity })).then(() => {
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
    setOpenModal(true);
  };


  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);


  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        {/* Book Image */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <img
              src={book.image_link}
              alt={book.title}
              style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
            />
          </Box>
        </Grid>
       
        {/* Book Details */}
        <Grid item xs={12} md={8}>
          <BookDetails
            book={book}
            quantity={quantity}
            setQuantity={setQuantity}
            handleAddToCart={handleAddToCart}
            handleBuyNow={handleBuyNow}
            maxQuantity={5}
          />
        </Grid>


        {/* Add Review Button and Review List */}
        <Grid item xs={12} md={4} display="flex" flexDirection="column" alignItems="center">
          <Button variant="contained" onClick={handleOpenModal} sx={{ mb: 2 }}>
            Add Review
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          <ReviewSection reviews={currentReviews} />
          <Pagination
            count={Math.ceil(reviews.length / reviewsPerPage)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            sx={{ mt: 2 }}
          />
        </Grid>
      </Grid>


      {/* Add Review Modal */}
      <AddReviewModal
        open={openModal}
        handleClose={handleCloseModal}
        handleAddReview={handleAddReview}
      />


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
