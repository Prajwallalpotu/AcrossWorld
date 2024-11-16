// src/pages/EditUser.js
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import Layout from '../components/Layout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const EditUser = () => {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [mapLink, setMapLink] = useState('');
  const navigate = useNavigate();
  const { userId } = 1;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        const userData = response.data;
  
        console.log('Fetched User Data:', userData);
  
        setName(userData.name || ''); 
        setEmail(userData.email || '');
        setNumber(userData.number || '');
        setCity(userData.city || '');
        setAddress(userData.address || '');
        setDescription(userData.description || '');
        setProfileImage(userData.profileImage || null);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [userId]);
  

  const handleEdit = () => {
    console.log('Editing user:', { name, description, email, number, city, address, mapLink });
  };

  

  const handleBack = () => navigate('/admin/dashboard');

  return (
    <Layout>
        
      <Box
        sx={{
          position: 'fixed',
          top: 80,
          left: 25,
          backgroundColor: 'transparent',
          color: '#34495E',
          borderRadius: '50%',
          border: '1px solid #34495E',
          width: 56,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#34495E',
            color: 'white'
          },
          transition: '0.3s ease-in-out'
        }}
        onClick={handleBack}
      >
        <ArrowBackIcon fontSize="large" />
      </Box>

      <Box sx={{
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
        mt: 15,
        mb: 10,
      }}>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>Edit User</Typography>

        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        <Box sx={{ width: '100%', margin: '16px 0', textAlign: 'center' }}>
          {profileImage ? (
            <Box
              sx={{
                position: 'relative',
                display: 'inline-block',
                '& img': {
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
                  objectFit: 'cover',
                },
                '& .remove-icon': {
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '4px',
                  cursor: 'pointer',
                },
              }}
            >
              <img src={profileImage ? URL.createObjectURL(profileImage) : ''} alt="Profile" />
              <Box
                className="remove-icon"
                onClick={() => setProfileImage(null)}
              >
                ✕
              </Box>
            </Box>
          ) : (
            <Button
              variant="outlined"
              component="label"
              sx={{
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            >
              Upload Profile Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setProfileImage(e.target.files[0])}
              />
            </Button>
          )}
        </Box>

        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          label="Mobile Number"
          fullWidth
          value={number}
          onChange={(e) => setNumber(e.target.value)}
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
          label="City"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
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
          label="Address"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
          label="Map Link"
          fullWidth
          value={mapLink}
          onChange={(e) => setMapLink(e.target.value)}
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

        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: 3, backgroundColor: '#2980b9', '&:hover': { backgroundColor: '#3498db' } }}
          onClick={handleEdit}
        >
          Save Changes
        </Button>
      </Box>
    </Layout>
  );
};

export default EditUser;
