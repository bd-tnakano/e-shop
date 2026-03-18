
import React, { useContext, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, TextField, Box } from '@mui/material';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <CardMedia
        component="img"
        height="200"
        image={`http://localhost:5000/images/${product.image}`} // Note: Ideally this URL should be configurable
        alt={product.name}
        sx={{ objectFit: 'contain', p: 2, bgcolor: 'background.default' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 2 }}>
          {product.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
            ${product.price}
          </Typography>
          <Typography variant="caption" sx={{
            bgcolor: product.stock > 0 ? 'success.light' : 'error.light',
            color: product.stock > 0 ? 'success.dark' : 'error.dark',
            px: 1, py: 0.5, borderRadius: 1, fontWeight: 600
          }}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
          <TextField
            type="number"
            size="small"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
            inputProps={{ min: 1, max: product.stock }}
            sx={{ width: '80px' }}
            disabled={product.stock === 0}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddToCart}
            disabled={!isLoggedIn || product.stock === 0}
            sx={{ flexGrow: 1 }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
