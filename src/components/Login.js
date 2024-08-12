import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography } from '@mui/material';
import { loginUser } from '../features/user/userSlice';


const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ username, password })).then(() => {
      onLoginSuccess();
    });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Username" fullWidth margin="normal" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>Login</Button>
      </form>
    </div>
  );
};

export default Login;
