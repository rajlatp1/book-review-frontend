import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Badge, Box, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { logout } from '../features/user/userSlice';
import { fetchCartItems, deleteCartItem, clearCart } from '../features/cart/cartSlice';
import LoginDialog from './LoginDialog';
import CartDrawer from './CartDrawer';
import ProfileMenu from './ProfileMenu';
import SnackbarNotification from './SnackbarNotification';


const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [cartOpen, setCartOpen] = useState(false);


  const user = useSelector((state) => state.user.user);
  const role = useSelector((state) => state.user.role);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems());
    }
  }, [user, dispatch]);


  const handleProfileMenuOpen = (event) => {
    if (user) {
      setAnchorEl(event.currentTarget);
    } else {
      setDialogOpen(true);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    dispatch(clearCart());  // Clear cart items on logout
    handleMenuClose();
    setSnackbarMessage('Successfully logged out');
    setSnackbarOpen(true);
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


  const handleCartOpen = () => {
    if (user) {
      setCartOpen(true);
    } else {
      setDialogOpen(true);
    }
  };


  const handleCartClose = () => {
    setCartOpen(false);
  };


  const handleCheckout = () => {
    handleCartClose();
    navigate('/checkout');
  };


  const handleRemoveItem = (itemId) => {
    const token = localStorage.getItem('token');
    dispatch(deleteCartItem({ token, itemId }));
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
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <IconButton
              edge="end"
              aria-label="cart"
              aria-haspopup="true"
              onClick={handleCartOpen}
              color="inherit"
            >
              <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="user account"
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ ml: 2 }}
            >
              <Avatar>{user ? getUserInitial() : <AccountCircle />}</Avatar>
            </IconButton>
          </Box>
          {user && (
            <ProfileMenu
              anchorEl={anchorEl}
              user={user}
              handleMenuClose={handleMenuClose}
              handleLogoutClick={handleLogoutClick}
            />
          )}
        </Toolbar>
        <LoginDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          onLoginSuccess={handleLoginSuccess}
          onRegisterSuccess={handleRegisterSuccess}
        />
        <SnackbarNotification
          snackbarOpen={snackbarOpen}
          snackbarMessage={snackbarMessage}
          handleSnackbarClose={handleSnackbarClose}
        />
      </AppBar>


      {/* Cart Drawer */}
      <CartDrawer
        cartOpen={cartOpen}
        handleCartClose={handleCartClose}
        cartItems={cartItems}
        handleCheckout={handleCheckout}
        handleRemoveItem={handleRemoveItem}  // Pass the remove item handler to the CartDrawer
      />
    </>
  );
};

export default Header;