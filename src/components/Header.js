import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Badge, Box, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { logoutUser } from '../features/user/userSlice';
import { fetchCartItems, deleteCartItem, clearCart } from '../features/cart/cartSlice';
import LoginDialog from './LoginDialog';
import CartDrawer from './CartDrawer';
import ProfileMenu from './ProfileMenu';


const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);


  const user = useSelector((state) => state.user.user);
  const role = useSelector((state) => state.user.role);
  const cartItems = useSelector((state) => state.cart.items) || [];  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems(user));
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
    dispatch(logoutUser());
    dispatch(clearCart());
    handleMenuClose();
  };


  const handleDialogClose = () => {
    setDialogOpen(false);
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
    dispatch(deleteCartItem({ itemId }));
  };


  const getUserInitial = () => {
    return user ? user.charAt(0).toUpperCase() : '';
  };


  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
          >
            Book Review Platform
          </Typography>
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
        />
      </AppBar>


      {/* Cart Drawer */}
      <CartDrawer
        cartOpen={cartOpen}
        handleCartClose={handleCartClose}
        cartItems={cartItems}
        handleCheckout={handleCheckout}
        handleRemoveItem={handleRemoveItem}
      />
    </>
  );
};

export default Header;