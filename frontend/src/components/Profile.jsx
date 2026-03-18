import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@mui/material';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    address: user?.address || '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, ...updatedData } = formData;
    if (password) {
      updatedData.password = password;
    }
    updateUser(updatedData);
  };

  return (
    <Grid container spacing={4} justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              User Profile
            </Typography>
            {user && (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* XSS VULNERABILITY */}
                    <div dangerouslySetInnerHTML={{ __html: formData.address }} />
                    <TextField
                      fullWidth
                      label="Home Address (HTML allowed)"
                      name="address"
                      multiline
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="New Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                      Save Changes
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Profile;
