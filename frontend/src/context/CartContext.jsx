
import React, { createContext, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const addToCart = (product) => {
    if (!isLoggedIn) {
      return;
    }
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: product.quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const checkout = () => {
    // In a real app, you'd send the cart data to a backend here.
    console.log('Checking out:', cart);
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
