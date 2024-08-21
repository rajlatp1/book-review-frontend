import React from 'react';
import { Card, CardContent, Typography, Box, Button, MenuItem, Select } from '@mui/material';


const BookDetails = ({ book, quantity, setQuantity, handleAddToCart, handleBuyNow, maxQuantity }) => {
  const availableStock = Math.max(0, Math.min(book.stock || 0, maxQuantity));


  return (
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
            {availableStock > 0 ? (
              [...Array(availableStock).keys()].map((q) => (
                <MenuItem key={q + 1} value={q + 1}>
                  {q + 1}
                </MenuItem>
              ))
            ) : (
              <MenuItem value={1} disabled>
                Out of Stock
              </MenuItem>
            )}
          </Select>
        </Box>
        <Button variant="contained" onClick={handleAddToCart} sx={{ mr: 2 }} disabled={availableStock === 0}>
          Add to Cart
        </Button>
        <Button variant="contained" onClick={handleBuyNow} disabled={availableStock === 0}>
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
};


export default BookDetails;
