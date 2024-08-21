import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Tabs, Tab, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Login from './Login';
import Register from './Register';
import SnackbarNotification from './SnackbarNotification';
import { useDispatch } from 'react-redux';
import { fetchCartItems } from '../features/cart/cartSlice';




const LoginDialog = ({ open, onClose }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const dispatch = useDispatch();


  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };


  const handleLoginSuccess = () => {
    setSnackbarMessage('Login successful');
    setSnackbarOpen(true);
    dispatch(fetchCartItems());
  };


  const handleRegisterSuccess = () => {
    setSnackbarMessage('Registration successful');
    setSnackbarOpen(true);
  };


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    onClose();
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        {tabIndex === 0 && <Login onLoginSuccess={handleLoginSuccess} />}
        {tabIndex === 1 && <Register onRegisterSuccess={handleRegisterSuccess} />}
      </DialogContent>
       <SnackbarNotification
          snackbarOpen={snackbarOpen}
          snackbarMessage={snackbarMessage}
          handleSnackbarClose={handleSnackbarClose}
        />
    </Dialog>
  );
};


export default LoginDialog;
