const mongoose = require('../utils/database'); // Import from database.js to ensure connection
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for Google users
    name: String,
    googleId: String,
    profilePicture: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema); // Mongoose auto-pluralizes to 'users'
