import axios from 'axios';


const API_URL = 'http://localhost:5000';


const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensures cookies are sent with requests
});


export const register = (username, password) => {
  return axiosInstance.post(`/register`, { username, password });
};


export const authenticate = (username, password) => {
  return axiosInstance.post(`/login`, { username, password });
};


export const getUserInfo = () => {
  return axiosInstance.get(`/user-info`);
};


export const logout = (username, password) => {
  return axiosInstance.post(`/logout`, { username, password });
};




export const getBooks = () => {
  return axios.get(`${API_URL}/books`);
};


export const getBook = (id) => {
  return axios.get(`${API_URL}/books/${id}`);
};


export const addReview = (bookId, review) => {
  return axiosInstance.post(`/reviews`, { book_id: bookId, review });
};


export const addBook = (title, author, description, price, stock, image) => {
  return axiosInstance.post(`/admin/books`, { title, author, description, price, stock, image });
};


export const updateBook = (bookId, title, author, description, price, stock, image) => {
  return axiosInstance.put(`/admin/books/${bookId}`, { title, author, description, price, stock, image });
};


export const deleteBook = (bookId) => {
  return axiosInstance.delete(`/admin/books/${bookId}`);
};


export const deleteReview = (reviewId) => {
  return axiosInstance.delete(`${API_URL}/admin/reviews/${reviewId}`);
};


export const getBookReviews = (bookId) => {
  return axiosInstance.get(`${API_URL}/books/${bookId}/reviews`);
};



// Add to Cart API function
export const addToCart = ({ bookId, quantity }) => {
  return axiosInstance.post('/cart', { book_id: bookId, quantity });
};


// Get Cart Items API function
export const getCartItems = () => {
  return axiosInstance.get('/cart');
};




export const removeCartItem = (itemId) => {
  return axiosInstance.delete(`/cart/${itemId}`);
};




export const fetchUsers = () => {
  return axiosInstance.get('/admin/users');
};


export const toggleAdminStatus = (userId) => {
  return axiosInstance.put(`/admin/users/${userId}/toggle-admin`);
};


export const searchUser = (query) => {
  return axiosInstance.get(`/admin/users/search?q=${query}`);
};


export const promoteUserToAdmin = (userId) => {
  return axiosInstance.put(`/admin/users/${userId}/promote`);
};

export const searchBook = (searchTerm) => {
  return axiosInstance.get(`/books/search?q=${encodeURIComponent(searchTerm)}`);
};