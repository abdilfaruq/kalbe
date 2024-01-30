import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './services/AppContext';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
