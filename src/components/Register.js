import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography } from '@mui/material';
import { registerUser } from '../features/user/userSlice';


const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser({ username, password })).then(() => {
      onRegisterSuccess();
    });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Typography variant="h5" gutterBottom>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Username" fullWidth margin="normal" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>Register</Button>
      </form>
    </div>
  );
};

export default Register;
