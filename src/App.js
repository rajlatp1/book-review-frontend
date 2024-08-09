import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import AdminPage from './pages/AdminPage';
import BookPage from './pages/BookPage';
import { logout } from './features/user/userSlice';

const ProtectedRoute = ({ element, isAllowed }) => {
  return isAllowed ? element : <Navigate to="/" />;
};

const App = () => {
  const user = useSelector((state) => state.user.role);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <Header loggedIn={!!user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:id" element={<BookPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} isAllowed={user === 'admin'} />} />
      </Routes>
    </Router>
  );
};

export default App;
