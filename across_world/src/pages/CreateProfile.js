import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import Layout from '../components/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    description: '',
    email: '',
    number: '',
    city: '',
    address: '',
  });

  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle back button click
  const handleBack = () => navigate('/');

  const isFormValid = () => {
    return (
      formData.name &&
      formData.description &&
      formData.email &&
      formData.number &&
      formData.city &&
      formData.address
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setErrorMessage('All fields are required!');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('number', formData.number);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('address', formData.address);


    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    axios
    .post(`${process.env.REACT_APP_BASE_LINK}/api/profiles/add-profile`, formDataToSend)
    .then((response) => {
      setSuccessMessage('Profile created successfully!');
      setErrorMessage('');
      setFormData({
        name: '',
        image: null,
        description: '',
        email: '',
        number: '',
        city: '',
        address: '',
      });
    })
    .catch((error) => {
      console.error('Error creating profile:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Failed to create profile. Please try again.');
      }
      setSuccessMessage('');
    });
};

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
          transition: '0.3s ease-in-out',
        }}
        onClick={handleBack}
      >
        <ArrowBackIcon fontSize="large" />
      </Box>

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
          maxWidth: 450,
          margin: '0 auto',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
          mt: 10,
          mb: 10,
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Create Profile
        </Typography>

        {/* Name Field */}
        <TextField
          label="Name"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleChange}
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

        {/* Profile Image Upload */}
        <Box sx={{ width: '100%', margin: '16px 0', textAlign: 'center' }}>
          {formData.image ? (
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
              <img src={URL.createObjectURL(formData.image)} alt="Profile" />
              <Box
                className="remove-icon"
                onClick={() => setFormData({ ...formData, image: null })}
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
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
              />
            </Button>
          )}
        </Box>

        {/* Description Field */}
        <TextField
          label="Description"
          fullWidth
          name="description"
          value={formData.description}
          onChange={handleChange}
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

        {/* Other Input Fields */}
        <TextField
          label="Email"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
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
          name="number"
          value={formData.number}
          onChange={handleChange}
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
          name="city"
          value={formData.city}
          onChange={handleChange}
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
          name="address"
          value={formData.address}
          onChange={handleChange}
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

        {/* Submit Button */}
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleSubmit}
          sx={{
            marginTop: 2,
            color: 'white',
            padding: 1,
            fontSize: '16px',
          }}
          
        >
          Create Profile
        </Button>

        {/* Success/Error Messages */}
        {successMessage && (
          <Typography variant="body1" sx={{ color: 'green', marginTop: 2 }}>
            {successMessage}
          </Typography>
        )}
        {errorMessage && (
          <Typography variant="body1" sx={{ color: 'red', marginTop: 2 }}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Layout>
  );
};

export default CreateProfile;
