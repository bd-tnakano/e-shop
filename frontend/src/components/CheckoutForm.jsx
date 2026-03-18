
import React, { useState, useContext, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';



const CheckoutForm = ({ isCheckoutOpen, setIsCheckoutOpen, handleCheckout, cart, total, user }) => {
  const { token } = useContext(AuthContext);
  const { refetchProducts } = useContext(ProductContext);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    creditCard: '',
  });

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: `${user.firstName} ${user.lastName}`,
        address: user.address || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post('http://localhost:5000/api/orders', { cart, total }, config);

      console.log('Checkout data:', formData);
      handleCheckout();
      refetchProducts();
      setIsCheckoutOpen(false);
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  return (
    <Modal
      open={isCheckoutOpen}
      onClose={() => setIsCheckoutOpen(false)}
      aria-labelledby="checkout-modal-title"
      aria-describedby="checkout-modal-description"
      closeAfterTransition
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 4,
        boxShadow: 24,
        p: 4,
        outline: 'none'
      }} component="form" onSubmit={handleSubmit}>
        <Typography id="checkout-modal-title" variant="h5" component="h2" align="center" sx={{ mb: 3, fontWeight: 700, color: 'primary.main' }}>
          Checkout
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
          Total: ${total.toFixed(2)}
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          autoComplete="address"
          value={formData.address}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="creditCard"
          label="Credit Card Number"
          name="creditCard"
          autoComplete="cc-number"
          value={formData.creditCard}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2, height: 48 }}
        >
          Submit Order
        </Button>
      </Box>
    </Modal>
  );
};

export default CheckoutForm;
