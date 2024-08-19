import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const register = (username, password) => {
    return axios.post(`${API_URL}/register`, { username, password });
};

export const authenticate = (username, password) => {
    return axios.post(`${API_URL}/login`, { username, password });
};

export const getBooks = () => {
    return axios.get(`${API_URL}/books`);
};

export const getBook = (id) => {
    return axios.get(`${API_URL}/books/${id}`);
};

export const addReview = (token, bookId, review) => {
    return axios.post(`${API_URL}/reviews`, { book_id: bookId, review }, { headers: { 'x-access-token': token } });
};

export const addBook = (token, title, author, description, image) => {
    return axios.post(`${API_URL}/admin/books`, { title, author, description, image }, { headers: { 'x-access-token': token } });
};

export const updateBook = (token, bookId, title, author, description, image) => {
    return axios.put(`${API_URL}/admin/books/${bookId}`, { title, author, description, image }, { headers: { 'x-access-token': token } });
};

export const deleteBook = (token, bookId) => {
    return axios.delete(`${API_URL}/admin/books/${bookId}`, { headers: { 'x-access-token': token } });
};

export const deleteReview = (token, reviewId) => {
    return axios.delete(`${API_URL}/admin/reviews/${reviewId}`, { headers: { 'x-access-token': token } });
};

export const addToCart = ({ token, bookId, quantity }) => {
    return axios.post(`${API_URL}/cart`, { book_id: bookId, quantity }, { headers: { 'x-access-token': token } });
};
  
export const getCartItems = () => {
    return axios.get(`${API_URL}/cart`, { headers: { 'x-access-token': localStorage.getItem('token')} });
};

export const removeCartItem = (token, itemId) => {
    return axios.delete(`${API_URL}/cart/${itemId}`, { headers: { 'x-access-token': token } });
};
  