import React from 'react';
import { Typography, List, ListItem } from '@mui/material';


const ReviewSection = ({ reviews }) => {
  return (
    <>
      <Typography variant="h5" component="div">
        Reviews
      </Typography>
      <List>
        {reviews.map((review, index) => (
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
    </>
  );
};


export default ReviewSection;
