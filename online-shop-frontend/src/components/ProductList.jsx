import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../services/AppContext';
import apiServices from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/ProductList.css';

function ProductItem({ product, addToCart }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  };

  return (
    <div className="product-item">
      <img
        src={product.imageUrl || `/src/assets/${product.productCode}.webp`}
        alt={product.productName}
      />
      <p>{product.productName}</p>
      <p>Quantity: {product.quantity}</p>
      <p>{formatCurrency(product.price)}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

function ProductList() {
  const { products, setProducts, cart, addToCart, removeItem, showCartInfo } = useContext(AppContext);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    apiServices.getProducts().then(response => setProducts(response.data));
  }, [setProducts]);

  useEffect(() => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalItems);
  }, [cart]);

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      {products.map(product => (
        <ProductItem key={product.id} product={product} addToCart={addToCart} />
      ))}
      {showCartInfo && (
        <div className="cart-info">
          <h3>Items in Cart:</h3>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <p>{item.productName} - {item.quantity}</p>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
          <Link to="/cart">View Cart</Link>
        </div>
      )}
      {showCartInfo && (
        <div className="cart-count">
          <p>{cartCount}</p>
        </div>
      )}
    </div>
  );
}

export default ProductList;
