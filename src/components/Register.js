import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography, Alert, LinearProgress, Box } from '@mui/material';
import { registerUser } from '../features/user/userSlice';


const Register = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);  // Password strength state
  const dispatch = useDispatch();


  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));  // Update password strength
  };


  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[@$!%*?&#]/.test(password)) strength += 1;  // Special character bonus
    return (strength / 5) * 100;
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);  // Clear previous errors


    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }


    if (passwordStrength < 100) {
      setError('Password is not strong enough. It must be at least 6 characters long, and include lowercase, uppercase, number, and special character.');
      return;
    }


    dispatch(registerUser({ username, password }))
      .unwrap()
      .then(() => {
        onRegisterSuccess();
      })
      .catch((err) => {
        setError(err || 'An unexpected error occurred. Please try again.');
      });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <Typography variant="h5" gutterBottom>Register</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!error}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          error={!!error}
        />
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">Password Strength</Typography>
          <LinearProgress variant="determinate" value={passwordStrength} sx={{ height: 10, borderRadius: 5 }} />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem' }}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
