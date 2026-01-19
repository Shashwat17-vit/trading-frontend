const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./Controllers/userController');
const stockController = require('./Controllers/stockController');
const User = require('./Models/User');
const app = express();
const mongoConnect = require('./utils/database')

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies

// User Routes
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);

// Stock Routes
app.get('/stock', stockController.getStock);
app.post('/stock', stockController.postStock);

// Home route
app.get('/', (req, res) => {
    res.send('<h1>Welcome!</h1><a href="/signup">Go to Sign Up</a> | <a href="/stock">Add Stock Report</a>');
});

app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
        console.log('Sign Up: http://localhost:3000/signup');
        console.log('Stock Reports: http://localhost:3000/stock');
    /*
    // Sync Sequelize User model (MySQL)
    User.sync()
        .then(() => {
            console.log('Database synced successfully!');
        })
        .catch(err => {
            console.error('Unable to sync database:', err);
        });
    */
});