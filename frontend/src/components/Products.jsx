import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ProductCard from './ProductCard';
import { AuthContext } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';

const Products = () => {
  const { products } = useContext(ProductContext);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Box>
      <Box sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 8,
        mb: 6,
        borderRadius: 4,
        textAlign: 'center',
        background: 'linear-gradient(45deg, #6A1B9A 30%, #8E24AA 90%)',
        boxShadow: 3
      }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Welcome to E-Shop
        </Typography>
        <Typography variant="h5" component="p" sx={{ opacity: 0.9 }}>
          Discover the best products at amazing prices.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid key={product._id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
