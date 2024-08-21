import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import AdminPage from './pages/AdminPage';
import BookPage from './pages/BookPage';
import { logoutUser, fetchUserInfo } from './features/user/userSlice';
import { fetchCartItems } from './features/cart/cartSlice';
import { Box } from '@mui/material';




const ProtectedRoute = ({ element, isAllowed }) => {
  return isAllowed ? element : <Navigate to="/" />;
};

const App = () => {
  const user = useSelector((state) => state.user.user);
  const role = useSelector((state) => state.user.role);
  const dispatch = useDispatch();
 
 


  useEffect(() => {
    if (!user) {
      dispatch(fetchUserInfo()).then((result) => {
        if (result.payload && result.payload.username) {
          dispatch(fetchCartItems());
        }
      });
    }
  }, [dispatch, user]);


  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Router>
      <Header loggedIn={!!user} onLogout={handleLogout} />
      <Box sx={{ minHeight: 'calc(100vh - 150px)', mb: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books/:id" element={<BookPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} isAllowed={role === 'admin'} />} />
        </Routes>
      </Box>
      <Footer />
    </Router>
  );
};

export default App;