import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

const BookList = ({ books }) => {
  return (
    <Grid sx={{ mt: 4 }} container spacing={3}>
      {books.map(book => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={book.id}>
          <Card>
            <Link to={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
              <CardMedia
                component="img"
                image={book.image_link}
                alt={book.title}
                style={{ height: 300, objectFit: 'contain' }}
              />
              <CardContent style={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h6" component="div" style={{ textAlign: 'center' }}>
                  {book.title}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
