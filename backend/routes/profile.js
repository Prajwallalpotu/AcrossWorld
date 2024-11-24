const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Profile = require('../models/Profile');
const Admin = require('../models/Admin');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Create a profile
router.post('/add-profile', upload.single('image'), async (req, res) => {
  try {
    const { name, description, email, number, city, address } = req.body;
    const image = req.file ? req.file.path : null; // Store the uploaded file path

    if (!name || !image || !email || !number || !city || !address) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    const profile = new Profile({ name, image, description, email, number, city, address });
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    console.error('Error creating profile:', err);
    res.status(500).json({ error: 'Failed to create profile' });
  }
});

// Add Admin Route
router.post('/add-admin', async (req, res) => {
  const { adminId, password } = req.body;

  if (!adminId || !password) {
    return res.status(400).json({ message: 'Admin ID and password are required' });
  }

  try {
    const existingAdmin = await Admin.findOne({ adminId });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin ID already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ adminId, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'New admin added successfully!' });
  } catch (error) {
    console.error('Error adding admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Admin login route
router.post('/admin/login', async (req, res) => {
  try {
    const { adminId, password } = req.body;

    // Check if admin ID and password are provided
    if (!adminId || !password) {
      return res.status(400).json({ error: 'Admin ID and password are required' });
    }

    // Find the admin in the database
    const admin = await Admin.findOne({ adminId });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ adminId: admin.adminId }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expiration time
    });

    res.status(200).json({ success: true, message: 'Login successful', token });
  } catch (err) {
    console.error('Error during admin login:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete profile
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    // Attempt to find and delete the profile by ID
    const deleteProfile = await Profile.findByIdAndDelete(id);
    
    // If no profile is found, return a 404 error
    if (!deleteProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Return a success message if deletion was successful
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (err) {
    console.log('Error deleting profile:', err); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' }); // Return the 500 error response
  }
});

router.get('/test', (req, res) => {
  res.send('Profiles route is working');
});



// Get all profiles
router.get('/', async (req, res) => {
  try {
    // Fetch all profiles from the database
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (err) {
    console.error('Error fetching profiles:', err);
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

// Export the router
module.exports = router;
