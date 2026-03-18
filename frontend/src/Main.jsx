import React, { useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Products from './components/Products';
import Cart from './components/Cart';
import RegistrationForm from './components/RegistrationForm';
import Profile from './components/Profile';
import { Container } from '@mui/material';
import Header from './components/Header';

const Main = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header setIsCartOpen={setIsCartOpen} />
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Container>
      <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} user={user} />
    </>
  );
};

export default Main;
