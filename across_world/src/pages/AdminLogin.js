import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import Layout from '../components/Layout';

const AdminLogin = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_LINK}/api/profiles/admin/login`, {
        adminId,
        password,
      });      
  
      if (response.data.success) {
        // Store the authentication token in localStorage
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('authToken', response.data.token);
  
        // Redirect to the admin dashboard
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials!');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Something went wrong');
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
          mt: 20,
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
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.7)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.7)',
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
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.7)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.7)',
                },
              },
            }}
          />
          {error && <Typography sx={{ color: 'red', marginBottom: 2 }}>{error}</Typography>}
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            color="primary"
            sx={{
              marginTop: 2,
              color: 'white',
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
