// src/components/ProfileDetails.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfileDetails = ({ profile }) => {
  const navigate = useNavigate();

  const handleViewOnMap = () => {
    navigate('/map', { state: { address: profile.address } });
  };
  return (
    <Box sx={{ padding: 1 }}>
      <Typography variant="h4" gutterBottom>{profile.name}</Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {profile.title}
      </Typography>
      <Typography variant="body1" paragraph>{profile.description}</Typography>
      
      <Typography variant="h6" gutterBottom>Contact Information:</Typography>
      <Typography variant="body2"><b>Email:</b> {profile.email}</Typography>
      <Typography variant="body2"><b>Phone:</b> {profile.number}</Typography>
      <br></br>

      <Typography variant="h6" gutterBottom>Address:</Typography>
      <Typography variant="body2"><b>Address:</b> {profile.address}</Typography>
      <Typography variant="body2"><b>City:</b> {profile.city}</Typography>
      <br></br>


      <Typography
        variant="body1"
        sx={{ color: '#2197D1', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
        onClick={handleViewOnMap}
      >
        <b>View on Maps</b>
      </Typography>
    </Box>
  );
};

export default ProfileDetails;
