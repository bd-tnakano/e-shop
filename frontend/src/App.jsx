import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Main from './Main';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Main />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;