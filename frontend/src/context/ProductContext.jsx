
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refetchProducts = () => {
    fetchProducts();
  };

  return (
    <ProductContext.Provider value={{ products, refetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
