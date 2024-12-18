import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // State for handling menu open/close
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogoClick = () => navigate('/');

  return (
    <AppBar position="sticky" color="primary" sx={{ backgroundColor: '#2C3E50' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1, cursor: 'pointer' }}
          onClick={handleLogoClick}
        >
          AcrossWorld
        </Typography>

        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          <MenuIcon sx={{ cursor: 'pointer' }} onClick={toggleMenu} />
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/map">Map</Button>
          <Button color="inherit" href="/admin/login">Admin Dashboard</Button>
        </Box>

        <Drawer
          anchor="right"
          open={menuOpen}
          onClose={toggleMenu}
          sx={{
            '& .MuiDrawer-paper': {
              width: 250,
              padding: 2,
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CloseIcon sx={{ cursor: 'pointer' }} onClick={toggleMenu} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
            <Button color="inherit" onClick={toggleMenu} href="/">Home</Button>
            <Button color="inherit" onClick={toggleMenu} href="/map">Map</Button>
            <Button color="inherit" onClick={toggleMenu} href="/admin/login">Admin Dashboard</Button>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
