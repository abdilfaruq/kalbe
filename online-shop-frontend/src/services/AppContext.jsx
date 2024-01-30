import { createContext, useState, useEffect, useContext } from 'react';
import apiServices from '../services/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCartInfo, setShowCartInfo] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    setShowCartInfo(totalItems > 0);
  }, [cart]);

  useEffect(() => {
    apiServices.getCustomers().then((response) => setCustomers(response.data));
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateCustomerInfo = (customerInfo) => {
    setCustomerInfo(customerInfo);
  };

  const resetCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        cart,
        addToCart,
        removeItem,
        showCartInfo,
        customers,
        customerInfo,
        updateCustomerInfo,
        resetCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
