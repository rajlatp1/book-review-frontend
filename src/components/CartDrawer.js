import React from 'react';
import { Drawer, Box, Typography, List, ListItem, ListItemText, Divider, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const CartDrawer = ({ cartOpen, handleCartClose, cartItems, handleCheckout, handleRemoveItem }) => {
  return (
    <Drawer anchor="right" open={cartOpen} onClose={handleCartClose}>
      <Box sx={{ width: 300 }} role="presentation">
        <Typography variant="h6" sx={{ p: 2 }}>
          Your Cart
        </Typography>
        <List>
          {cartItems.map((item, index) => (
            <ListItem key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={item.image_link}
                alt={item.title}
                style={{ width: '50px', height: '50px', marginRight: '10px', objectFit: 'contain' }}
              />
              <ListItemText
                primary={item.title}
                secondary={`Quantity: ${item.quantity} | Price: ₹${item.price}`}
                sx={{ flexGrow: 1 }}
              />
              <IconButton onClick={() => handleRemoveItem(item.id)} edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1">
            Total: ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
          </Typography>
          <Button variant="contained" color="primary" fullWidth onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};


export default CartDrawer;
