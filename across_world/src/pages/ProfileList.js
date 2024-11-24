import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Select, MenuItem } from '@mui/material';
import Layout from '../components/Layout';
import ProfileCard from '../components/ProfileCard';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const ProfileList = () => {
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [profiles, setProfiles] = useState([]);

  const navigate = useNavigate();

  // Fetch profiles from the database
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/profiles');
        setProfiles(response.data); // Set profiles fetched from the database
      } catch (err) {
        console.error('Error fetching profiles:', err);
      }
    };
    fetchProfiles();
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);
  const handleFilter = (e) => setLocationFilter(e.target.value);
  const handleAddUser = () => navigate('/create_card');

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(search.toLowerCase()) &&
      (locationFilter === '' || profile.city === locationFilter)
  );

  return (
    <Layout>
      <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Profiles
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            width: '100%',
            maxWidth: 800,
            flexWrap: 'wrap',
            justifyContent: 'center',
            mb: 5,
          }}
        >
          <TextField
            label="Search by Name"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            sx={{ width: { xs: '100%', sm: '45%' } }}
          />
          <Select
            value={locationFilter}
            onChange={handleFilter}
            displayEmpty
            sx={{ width: { xs: '100%', sm: '45%' } }}
          >
            <MenuItem value="">All Locations</MenuItem>
            {[...new Set(profiles.map((profile) => profile.city))].map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: { xs: 'center', sm: 'center' },
            alignItems: 'center',
            gap: 2,
            marginTop: 3,
            width: '100%',
            maxWidth: 1000,
            margin: '0 auto',
          }}
        >
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <Box
                key={profile._id}
                sx={{
                  width: { xs: '90%', sm: '33.33%' }, 
                  padding: 1,
                  flexShrink: 0,
                  // display: 'flex',
                  // justifyContent: 'center',
                  alignItems:'center'
                }}
              >
                <ProfileCard profile={profile} />
              </Box>
            ))
          ) : (
            <Typography variant="h6" align="center">
              No profiles found.
            </Typography>
          )}
        </Box>

      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 25,
          right: 25,
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
            color: 'white',
          },
          transition: '0.3s ease-in-out',
        }}
        onClick={handleAddUser}
      >
        <AddIcon fontSize="large" />
      </Box>
    </Layout>
  );
};

export default ProfileList;
