const mongoose = require('mongoose');

// Define the Profile schema
const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
  email: { type: String, required: true },
  number: { type: Number, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true }, // Address field
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Export the Profile model
module.exports = mongoose.model('Profiles', ProfileSchema);
