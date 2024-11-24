const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const profileRoutes = require('./routes/profile'); // Import the routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/profiles', profileRoutes); // Base route for profiles and admin-related endpoints

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the AcrossWorld Backend!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
