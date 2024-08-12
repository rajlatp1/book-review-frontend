// src/components/LoginDialog.js


import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Tabs, Tab, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Login from './Login';
import Register from './Register';


const LoginDialog = ({ open, onClose, onLoginSuccess, onRegisterSuccess }) => {
  const [tabIndex, setTabIndex] = useState(0);


  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
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
        {tabIndex === 0 && <Login onLoginSuccess={onLoginSuccess} />}
        {tabIndex === 1 && <Register onRegisterSuccess={onRegisterSuccess} />}
      </DialogContent>
    </Dialog>
  );
};


export default LoginDialog;
