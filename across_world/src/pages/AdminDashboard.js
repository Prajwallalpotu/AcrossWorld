// src/pages/AdminDashboard.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { mockProfiles } from '../data/profileData';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import AddIcon from '@mui/icons-material/Add';


const AdminDashboard = () => {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => setSearch(e.target.value);
  const handleFilter = (e) => setLocationFilter(e.target.value);

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(search.toLowerCase()) &&
    (locationFilter === '' || profile.city === locationFilter)
  );

  const handleAddUser = () => navigate('/admin/add');
  const handleEditUser = (id) => navigate(`/admin/edit/${id}`);
  const handleDeleteUser = (id) => setProfiles(profiles.filter(profile => profile.id !== id));

  return (
    <Layout>
      <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ marginBottom: 5 }}>Admin Dashboard</Typography>

        <Box sx={{ display: 'flex', gap: 2, width: '100%', maxWidth: 800, flexWrap: 'wrap', justifyContent: 'center' }}>
          <TextField
            label="Search by Name"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            sx={{ flexGrow: 1, minWidth: 200 }}
          />
          <Select
            value={locationFilter}
            onChange={handleFilter}
            displayEmpty
            variant="outlined"
            sx={{ flexGrow: 1, minWidth: 200 }}
          >
            <MenuItem value="">All Locations</MenuItem>
            {[...new Set(mockProfiles.map(profile => profile.city))].map(city => (
              <MenuItem key={city} value={city}>{city}</MenuItem>
            ))}
          </Select>
        </Box>

        <TableContainer component={Paper} sx={{ marginTop: 5, width: '100%', maxWidth: 800 }}>
          <Table aria-label="User Table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: 16 }}>Actions</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: 16 }}>Name</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold', fontSize: 16 }}>City</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProfiles.map(profile => (
                <TableRow key={profile.id}>
                  <TableCell align="left" sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined" color="primary" onClick={() => handleEditUser(profile.id)} size="small">
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDeleteUser(profile.id)} size="small">
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell align="left">{profile.name}</TableCell>
                  <TableCell align="left">{profile.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            position: 'fixed', 
            bottom: 25,        
            right: 25,         
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
          onClick={handleAddUser} 
        >
          <AddIcon fontSize="large" />
        </Box>

      </Box>
    </Layout>
  );
};

export default AdminDashboard;
