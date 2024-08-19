import React from 'react';
import { Snackbar } from '@mui/material';


const SnackbarNotification = ({ snackbarOpen, snackbarMessage, handleSnackbarClose }) => {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={1000}
      onClose={handleSnackbarClose}
      message={snackbarMessage}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    />
  );
};


export default SnackbarNotification;