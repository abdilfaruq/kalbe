import React, { useContext } from 'react';
import { AppContext } from '../services/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/Checkout.css';

function Checkout() {
  const { cart, customerInfo, updateCustomerInfo, resetCart } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    try {
      updateCustomerInfo({});
      resetCart();
      navigate('/', { state: { refresh: true } });
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handleGoBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate('/cart');
    }
  };

  return (
    <div className="checkout-container">
      <div>
        <div className="back-button" onClick={handleGoBack}>
          <FaArrowLeft /> Back
        </div>
        <h2>Checkout</h2>
      </div>
      <div className="customer-info">
        <p>Name: {customerInfo.customerName}</p>
        <p>Address: {customerInfo.customerAddress}</p>
        <p>Gender: {customerInfo.gender === '1' ? 'Male' : 'Female'}</p>
        <p>Birth Date: {new Date(customerInfo.birthDate).toLocaleDateString()}</p>
      </div>
      <div className="customer-info">
        {cart.map((item) => (
          <div key={item.id}>
            <p>
              Product Name: {item.productName} - Quantity: {item.quantity} - Total:{' '}
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>
      <div className="total-amount">
        <p>Total: {formatCurrency(totalAmount)}</p>
      </div>
      <button className="place-order-button" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
