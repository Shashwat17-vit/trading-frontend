const User = require('../Models/User');
const path = require('path');

// Show signup form
exports.getSignup = (req, res) => {
    res.sendFile(path.join(__dirname, '../Views/signup.html'));
};

// Handle signup form submission
exports.postSignup = async (req, res) => {
    try {
        const { name, email, password, accountType } = req.body;
        
        // Create user in database
        const user = await User.create({
            name,
            email,
            password,
            accountType
        });
        
        // Console log the created user
        console.log('=== New User Created ===');
        console.log('ID:', user.id);
        console.log('Name:', user.name);
        console.log('Email:', user.email);
        console.log('Password:', user.password);
        console.log('Account Type:', user.accountType);
        console.log('========================');
        
        // Send success page
        res.sendFile(path.join(__dirname, '../Views/success.html'));
    } catch (error) {
        console.error('Error creating user:', error);
        
        // Send error page
        res.status(400).sendFile(path.join(__dirname, '../Views/Failed.html'));
    }
};
