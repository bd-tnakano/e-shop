
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Box, Typography, TextField, Button, Grid } from '@mui/material';
import { AuthContext } from '../context/AuthContext';



const LoginForm = ({ isLoginOpen, setIsLoginOpen }) => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(formData.username, formData.password);
    if (result.success) {
      setIsLoginOpen(false);
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <Modal
      open={isLoginOpen}
      onClose={() => setIsLoginOpen(false)}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
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
        <Typography id="login-modal-title" variant="h5" component="h2" align="center" sx={{ mb: 3, fontWeight: 700, color: 'primary.main' }}>
          Welcome Back
        </Typography>
        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          type="text"
          autoComplete="username"
          autoFocus
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2, height: 48 }}
        >
          Sign In
        </Button>
        <Grid container justifyContent="center">
          <Grid item>
            <Link to="/register" style={{ textDecoration: 'none' }} onClick={() => setIsLoginOpen(false)}>
              <Typography variant="body2" color="primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                Don't have an account? Sign Up
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default LoginForm;
