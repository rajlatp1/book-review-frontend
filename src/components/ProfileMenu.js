import React from 'react';
import { Menu, MenuItem } from '@mui/material';


const ProfileMenu = ({ anchorEl, user, handleMenuClose, handleLogoutClick }) => {
  return (
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
  );
};


export default ProfileMenu;