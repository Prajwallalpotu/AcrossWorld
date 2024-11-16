// src/pages/ProfileView.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import mockProfiles from '../data/profileData'; // Import from profileData.js
import Layout from '../components/Layout';

const ProfileView = () => {
  const { id } = useParams();
  const profile = mockProfiles.find((p) => p.id === parseInt(id, 10));

  if (!profile) return <p>Profile not found</p>;

  return (
    <Layout>
      <Card style={{ margin: '10px' }}>
        <CardContent>
          <Typography variant="h5">{profile.name}</Typography>
          <Typography variant="body2">{profile.description}</Typography>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ProfileView;
