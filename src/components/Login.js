import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography, Alert } from '@mui/material';
import { loginUser } from '../features/user/userSlice';


const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const userError = useSelector((state) => state.user.error);


  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);  // Clear previous errors


    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }


    dispatch(loginUser({ username, password }))
      .unwrap()
      .then(() => {
        onLoginSuccess();
      })
      .catch((err) => {
        setError(err || userError || 'An unexpected error occurred. Please try again.');
      });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          error={!!error}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          error={!!error}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;