import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { logout } from '../features/user/userSlice';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
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
  };

  const menuId = 'primary-search-account-menu';

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>Book Review Platform</Typography>
        <MenuItem component={Link} to="/">Home</MenuItem>
        {user && role === 'admin' && <MenuItem component={Link} to="/admin">Admin</MenuItem>}
        {user ? (
          <>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id={menuId}
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <MenuItem component={Link} to="/register">Register</MenuItem>
            <MenuItem component={Link} to="/login">Login</MenuItem>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
