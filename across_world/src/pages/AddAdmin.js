import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import Layout from '../components/Layout';

const AddAdmin = () => {
  const [newAdminId, setNewAdminId] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddAdmin = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/profiles/add-admin', {
        adminId: newAdminId,
        password: newAdminPassword,
      });
      setSuccess(response.data.message);
      setNewAdminId('');
      setNewAdminPassword('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setSuccess('');
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
          Add New Admin
        </Typography>
        <Box sx={{ width: '100%' }}>
          <TextField
            label="New Admin ID"
            variant="outlined"
            fullWidth
            value={newAdminId}
            onChange={(e) => setNewAdminId(e.target.value)}
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
            value={newAdminPassword}
            onChange={(e) => setNewAdminPassword(e.target.value)}
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
          {success && <Typography sx={{ color: 'green', marginBottom: 2 }}>{success}</Typography>}
          <Button
            variant="contained"
            fullWidth
            onClick={handleAddAdmin}
            color="primary"
            sx={{
              marginTop: 2,
              color: 'white',
              padding: 1,
              fontSize: '16px',
            }}
          >
            Add Admin
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default AddAdmin;
