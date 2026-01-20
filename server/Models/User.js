const { Schema } = require('mongoose');
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for Google users
    name: String,
    googleId: String, // ← Add this
    profilePicture: String, // ← Add this
    createdAt: { type: Date, default: Date.now }
  });