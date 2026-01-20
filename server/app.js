const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./Controllers/userController');
const stockController = require('./Controllers/stockController');
//const User = require('./Models/User');
const app = express();
//const mongoConnect = require('./utils/database')
const path = require('path');

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies

// Serve React build files (client folder is one level up from server)
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// API Routes (POST only)
app.post('/signup', userController.postSignup);
app.post('/login', stockController.postStock);

// Catch-all: Serve React app for any other request (must be last)
app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(3000, () => {
        console.log('✅ Server is running on http://localhost:3000');        
});