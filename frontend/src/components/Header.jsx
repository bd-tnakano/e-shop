
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Badge, IconButton, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import LoginForm from './LoginForm';

const Header = ({ setIsCartOpen }) => {
  const { cart } = useContext(CartContext);
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const itemCount = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" component={Link} to="/" sx={{
            fontWeight: 700,
            color: 'primary.main',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            letterSpacing: '-0.5px'
          }}>
            E-Shop
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isLoggedIn ? (
              <>
                <Typography variant="body1" sx={{ fontWeight: 500, display: { xs: 'none', sm: 'block' } }}>
                  Hello, {user ? user.firstName : 'User'}
                </Typography>
                <Button
                  color="inherit"
                  component={Link}
                  to="/profile"
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                >
                  Profile
                </Button>
                <IconButton
                  color="primary"
                  onClick={() => setIsCartOpen(true)}
                  sx={{
                    bgcolor: 'primary.light',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.main' }
                  }}
                >
                  <Badge badgeContent={itemCount} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={logout}
                  sx={{ borderRadius: 2 }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to="/register"
                  sx={{ borderRadius: 2, px: 3 }}
                >
                  Register
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsLoginOpen(true)}
                  sx={{ borderRadius: 2, px: 4 }}
                >
                  Login
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <LoginForm isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
    </>
  );
};

export default Header;
