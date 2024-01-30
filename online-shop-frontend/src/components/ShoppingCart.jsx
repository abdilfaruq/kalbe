import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../services/AppContext';
import { FaArrowLeft } from 'react-icons/fa';
import apiServices from '../services/api';
import '../styles/ShoppingCart.css';

function ShoppingCart() {
  const { cart, removeItem, updateCustomerInfo } = useContext(AppContext);
  const [customerInfo, setCustomerInfo] = useState({
    customerName: '',
    customerAddress: '',
    gender: '',
    birthDate: '',
  });
  const [validationMessages, setValidationMessages] = useState({
    name: '',
    address: '',
    gender: '',
    birthDate: '',
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  };

  const navigate = useNavigate();

  const handleRemoveItem = (productId) => {
    removeItem(productId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value,
    });
    setValidationMessages({
      ...validationMessages,
      [name]: '',
    });
  };

  const validateInputs = () => {
    const messages = {};
    if (!customerInfo.customerName.trim()) {
      messages.name = 'Name is required';
    }
    if (!customerInfo.customerAddress.trim()) {
      messages.address = 'Address is required';
    }
    if (customerInfo.gender !== '1' && customerInfo.gender !== '0') {
      messages.gender = 'Please select a valid gender';
    }
    if (!customerInfo.birthDate) {
      messages.birthDate = 'Birth Date is required';
    }
    return messages;
  };

  const renderCartItem = (item) => (
    <div key={item.id} className="cart-item">
      <p>{item.productName}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Total: {formatCurrency(item.price * item.quantity)}</p>
      <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
    </div>
  );

  const renderCustomerForm = () => (
    <div className="customer-form">
      <h3>Enter Your Information:</h3>
      <p>
        Name:
        <input
          type="text"
          name="customerName"
          value={customerInfo.customerName}
          onChange={handleInputChange}
        />
        <span className="validation-message">{validationMessages.name}</span>
      </p>
      <p>
        Address:
        <input
          type="text"
          name="customerAddress"
          value={customerInfo.customerAddress}
          onChange={handleInputChange}
        />
        <span className="validation-message">{validationMessages.address}</span>
      </p>
      <p>
        Gender:
        <select name="gender" value={customerInfo.gender} onChange={handleInputChange}>
          <option value="" disabled hidden>Please Select One</option>
          <option value="1">Male</option>
          <option value="0">Female</option>
        </select>
        <span className="validation-message">{validationMessages.gender}</span>
      </p>
      <p>
        Birth Date:
        <input
          type="date"
          name="birthDate"
          value={customerInfo.birthDate}
          onChange={handleInputChange}
        />
        <span className="validation-message">{validationMessages.birthDate}</span>
      </p>
      <button className="checkout-button" onClick={handleCheckout}>
        Save Information and Proceed to Checkout
      </button>
    </div>
  );

  const handleCheckout = async () => {
    const messages = validateInputs();

    if (Object.values(messages).some((msg) => msg !== '')) {
      setValidationMessages(messages);
      return;
    }

    try {
      await apiServices.createCustomer(customerInfo);
      updateCustomerInfo(customerInfo);
      navigate('/checkout');
    } catch (error) {
      console.error('Error while processing checkout:', error);
    }
  };

  return (
    <div className="shopping-cart-container">
      <div>
        <Link to="/" className="back-to-home-link">
          <FaArrowLeft /> Back
        </Link>
        <h2>Shopping Cart</h2>
      </div>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">{cart.map(renderCartItem)}</div>
          {renderCustomerForm()}
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
