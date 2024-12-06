// src/components/ProfileCard.js
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import ProfileDetails from './ProfileDetails';

const ProfileCard = ({ profile }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3, textAlign: 'center',padding:1,pt:2 }}>
        <CardMedia
          component="img"
          height="100"
          image={`${process.env.REACT_APP_BASE_LINK}/${profile.image}`}
          sx={{ borderRadius: '50%', width: 100, margin: '0 auto',backgroundColor:'lightgray',fontSize:12}}
        />
        <CardContent>
          <Typography variant="h6">{profile.name}</Typography>
          <Typography variant="body2" color="text.secondary">{profile.location}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>{profile.description}</Typography>
        </CardContent>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{ margin: 2 }}
          >
            View Details
          </Button>
        
      </Card>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <ProfileDetails profile={profile} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileCard;
