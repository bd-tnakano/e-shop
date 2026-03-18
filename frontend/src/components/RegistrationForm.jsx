
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, Typography, Container, Paper, Box, Grid } from '@mui/material';

const RegistrationForm = () => {
  const { register, login, isLoggedIn } = useContext(AuthContext); // Added login
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    address: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await register(formData);
    if (result.success) {
      // Auto-login after successful registration
      const loginResult = await login(formData.username, formData.password);
      if (loginResult.success) {
        // Redirect handled by useEffect
      } else {
        setError(loginResult.error || 'Login after registration failed');
        navigate('/login'); // Fallback if auto-login fails (though /login route might need fixing if it doesn't exist)
      }
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 4 }}>
        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 700, color: 'primary.main' }}>
          Create Account (or Login)
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="text"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 4, mb: 2, height: 48 }}
          >
            Register
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegistrationForm;
