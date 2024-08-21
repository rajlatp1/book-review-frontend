import React from 'react';
import { Box, Typography } from '@mui/material';


const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        pt: 4,  
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Typography variant="body1" align="center">
        &copy; {new Date().getFullYear()} Book Review Platform. All rights reserved.
      </Typography>
    </Box>
  );
};


export default Footer;
