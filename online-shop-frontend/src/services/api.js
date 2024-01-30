import axios from 'axios';

const baseURL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL,
});

const handleRequestError = (error) => {
  console.error('API request error:', error);
  throw error;
};

const get = (url) => api.get(url).catch(handleRequestError);
const post = (url, data) => api.post(url, data).catch(handleRequestError);

export const getProducts = () => get('/products');
export const getCustomers = () => get('/customers');
export const getSalesOrders = () => get('/salesorders');

export const createProduct = (productData) => post('/products', productData);
export const createCustomer = (customerData) => post('/customers', customerData);
export const createSalesOrder = (salesOrderData) => post('/salesorders', salesOrderData);

export const addToCart = (productId) => post('/cart/add', { productId });

const apiServices = {
  getProducts,
  getCustomers,
  getSalesOrders,
  createProduct,
  createCustomer,
  createSalesOrder,
  addToCart,
};

export default apiServices;
