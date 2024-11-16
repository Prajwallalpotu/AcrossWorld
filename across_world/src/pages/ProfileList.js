import React, { useState } from 'react';
import { Box, TextField, Typography, Select, MenuItem } from '@mui/material';
import { mockProfiles } from '../data/profileData';
import Layout from '../components/Layout';
import ProfileCard from '../components/ProfileCard';

const ProfileList = () => {
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const handleSearch = (e) => setSearch(e.target.value);
  const handleFilter = (e) => setLocationFilter(e.target.value);

  const filteredProfiles = mockProfiles.filter(profile =>
    profile.name.toLowerCase().includes(search.toLowerCase()) &&
    (locationFilter === '' || profile.city === locationFilter)
  );

  return (
    <Layout>
      <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>Profiles</Typography>

        <Box sx={{ display: 'flex', gap: 2, width: '100%', maxWidth: 800, flexWrap: 'wrap', justifyContent: 'center',mb:5 }}>
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
            {[...new Set(mockProfiles.map(profile => profile.city))].map(city => (
              <MenuItem key={city} value={city}>{city}</MenuItem>
            ))}
          </Select>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 2,
            marginTop: 3,
            width: '100%',
            maxWidth: 1000,
            margin: '0 auto', 
          }}
        >
          {filteredProfiles.map(profile => (
            <Box
              key={profile.id}
              sx={{
                width: { xs: '100%', sm: '33.33%' },
                padding: 1,
                flexShrink: 0,
              }}
            >
              <ProfileCard profile={profile} />
            </Box>
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default ProfileList;
