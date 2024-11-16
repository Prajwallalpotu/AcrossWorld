import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import Layout from '../components/Layout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleAdd = () => {
    console.log('Adding user:', { name, description, email,number,city,address });
  };
  const handleBack = () => navigate('/admin/dashboard');

  return (
    <Layout>
      <Box
          sx={{
            position: 'fixed', 
            top: 80,        
            left: 25,         
            backgroundColor:'transparent', 
            color: '#34495E',    
            borderRadius: '50%', 
            border:'1px solid #34495E',
            width: 56,         
            height: 56,        
            display: 'flex',   
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', 
            cursor: 'pointer', 
            '&:hover': {
              backgroundColor: '#34495E',
              color:'white'
            },
            transition : '0.3s ease-in-out'
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
          mt:15,
          mb:10,
        }}>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>Add New User</Typography>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
            InputLabelProps={{
              style: { color: 'white'}, // Label color
            }}
            InputProps={{
              style: { color: 'white'}, // Text color
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
              <img src={URL.createObjectURL(profileImage)} alt="Profile" />
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
              style: { color: 'white'}, // Label color
            }}
            InputProps={{
              style: { color: 'white'}, // Text color
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
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
              InputLabelProps={{
                style: { color: 'white'}, // Label color
              }}
              InputProps={{
                style: { color: 'white'}, // Text color
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
          label="Mobile Number"
          fullWidth
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          margin="normal"
          InputLabelProps={{
            style: { color: 'white'}, // Label color
          }}
          InputProps={{
            style: { color: 'white'}, // Text color
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
          label="City"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          margin="normal"
          InputLabelProps={{
            style: { color: 'white'}, // Label color
          }}
          InputProps={{
            style: { color: 'white'}, // Text color
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
          label="Address"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          margin="normal"
          InputLabelProps={{
            style: { color: 'white'}, // Label color
          }}
          InputProps={{
            style: { color: 'white'}, // Text color
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

        <Button variant="contained" fullWidth color="primary" onClick={handleAdd} 
        sx={{
              marginTop: 2,
              color: 'white',
              '&:hover': {
              },
              padding: 1,
              fontSize: '16px',
            }}>
          Add User
        </Button>
      </Box>
    </Layout>
  );
};

export default AddUser;
