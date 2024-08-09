import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { loginUser } from '../features/user/userSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ username, password })).then(() => navigate('/'));
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh" bgcolor="background.default">
      <Paper elevation={3} style={{ padding: '2rem', maxWidth: '400px', width: '100%' }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Username" fullWidth margin="normal" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <TextField label="Password" type="password" fullWidth margin="normal" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>Login</Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
