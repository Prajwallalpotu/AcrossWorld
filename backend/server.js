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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.use(cors({
//   origin: process.env.ORIGIN,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/profiles', profileRoutes); // Base route for profiles and admin-related endpoints

app.use("/uploads", express.static(__dirname + "/uploads"));

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the AcrossWorld Backend!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
