import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Toolbar, Typography, Menu, MenuItem, IconButton, Avatar, Snackbar } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { logout } from '../features/user/userSlice';
import LoginDialog from './LoginDialog';


const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const user = useSelector((state) => state.user.user);
  const role = useSelector((state) => state.user.role);
  const dispatch = useDispatch();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    handleMenuClose();
    setSnackbarMessage('Successfully logged out');
    setSnackbarOpen(true);
  };


  const handleDialogOpen = () => {
    setDialogOpen(true);
  };


  const handleDialogClose = () => {
    setDialogOpen(false);
  };


  const handleLoginSuccess = () => {
    setSnackbarMessage('Login successful');
    setSnackbarOpen(true);
    setDialogOpen(false);
  };


  const handleRegisterSuccess = () => {
    setSnackbarMessage('Registration successful');
    setSnackbarOpen(true);
    setDialogOpen(false);
  };


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  const getUserInitial = () => {
    return user ? user.charAt(0).toUpperCase() : '';
  };


  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>Book Review Platform</Typography>
          <MenuItem component={Link} to="/">Home</MenuItem>
          {user && role === 'admin' && <MenuItem component={Link} to="/admin">Admin</MenuItem>}
          {user ? (
            <>
              <IconButton
                edge="end"
                aria-label="user account"
                aria-controls="user-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar>{getUserInitial()}</Avatar>
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem disabled>Welcome, {user}</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton
              edge="end"
              aria-label="my account"
              aria-haspopup="true"
              onClick={handleDialogOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
        <LoginDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          onLoginSuccess={handleLoginSuccess}
          onRegisterSuccess={handleRegisterSuccess}
        />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        />
      </AppBar>
    </>
  );
};

export default Header;