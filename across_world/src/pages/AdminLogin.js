import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import Layout from '../components/Layout';

const AdminLogin = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Hardcoded admin credentials (for simplicity)
    if (adminId === 'admin' && password === 'password123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard'); // Redirect to Admin Dashboard
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2C3E50',
          borderRadius: 5,
          padding: 4,
          color: 'white',
          maxWidth: 400,
          margin: '0 auto',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
          mt:20
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Admin Login
        </Typography>
        <Box sx={{ width: '100%' }}>
          <TextField
            label="Admin ID"
            variant="outlined"
            fullWidth
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            margin="normal"
            InputLabelProps={{
              style: { color: 'white'}, 
            }}
            InputProps={{
              style: { color: 'white'}, 
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.7)', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.7)', // Border color when focused
                },
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            InputLabelProps={{
              style: { color: 'white' }, // Label color
            }}
            InputProps={{
              style: { color: 'white' }, // Text color
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Default border color
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.7)', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.7)', // Border color when focused
                },
              },
            }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            color='primary'
            sx={{
              marginTop: 2,
              color: 'white',
              '&:hover': {
              },
              padding: 1,
              fontSize: '16px',
            }}
          >
            Login
          </Button>
        </Box>
        
      </Box>
    </Layout>
  );
};

export default AdminLogin;
