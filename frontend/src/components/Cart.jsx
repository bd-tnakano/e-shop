
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Typography, List, ListItem, ListItemText, Modal, Box, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckoutForm from './CheckoutForm';



const Cart = ({ isCartOpen, setIsCartOpen, user }) => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, checkout } = useContext(CartContext);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleFinalCheckout = () => {
    checkout();
    setIsCheckoutOpen(false);
  };

  return (
    <>
      <Modal
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{
          width: { xs: '90%', sm: 500 },
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
          outline: 'none',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: 700 }}>
              Shopping Cart
            </Typography>
            <IconButton onClick={() => setIsCartOpen(false)}>
              <DeleteIcon sx={{ display: 'none' }} /> {/* distinct close icon would be better but reusing what's here or adding Clean Close icon if imported */}
            </IconButton>
          </Box>

          <List sx={{ mb: 2 }}>
            {cart.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                Your cart is empty.
              </Typography>
            ) : (
              cart.map((item) => (
                <ListItem key={item._id} divider sx={{ py: 2 }}>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {item.name}
                      </Typography>
                    }
                    secondary={`$${item.price} x ${item.quantity}`}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton size="small" onClick={() => decreaseQuantity(item._id)} sx={{ border: '1px solid', borderColor: 'divider' }}>
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2" sx={{ mx: 1 }}>{item.quantity}</Typography>
                    <IconButton size="small" onClick={() => increaseQuantity(item._id)} sx={{ border: '1px solid', borderColor: 'divider' }}>
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, ml: 2, minWidth: 60, textAlign: 'right' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                  <IconButton edge="end" aria-label="delete" onClick={() => removeFromCart(item._id)} color="error" sx={{ ml: 1 }}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))
            )}
            {cart.length > 0 && (
              <ListItem sx={{ py: 2 }}>
                <ListItemText primary={<Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>} />
                <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>${total.toFixed(2)}</Typography>
              </ListItem>
            )}
          </List>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
            <Button onClick={() => setIsCartOpen(false)} color="inherit">
              Continue Shopping
            </Button>
            <Button
              variant="contained"
              onClick={openCheckout}
              disabled={cart.length === 0}
              size="large"
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Modal>
      <CheckoutForm
        isCheckoutOpen={isCheckoutOpen}
        setIsCheckoutOpen={setIsCheckoutOpen}
        handleCheckout={handleFinalCheckout}
        cart={cart}
        total={total}
        user={user}
      />
    </>
  );
};

export default Cart;
