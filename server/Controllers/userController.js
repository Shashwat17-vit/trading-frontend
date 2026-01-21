const User = require('../Models/User');
const path = require('path');

// Show signup form
exports.getSignup = (req, res) => {
    res.sendFile(path.join(__dirname, '../Views/signup.html'));
};

// Handle signup form submission
exports.postSignup = async (req, res) => {
    try {
        const { email, fullName, password, confirmPassword } = req.body;
        
        // Create user in database
        const user = await User.create({
            email,
            fullName,
            password,
            confirmPassword
        });
        user.findOne({ email:email }).then(userdoc => {
            if (userdoc) {
                return res.redirect('/signup');
            }
            const newUser = new User({ email, fullName, password, confirmPassword });
            return newUser.save().then(user => {
                res.redirect('/login');
            }).catch(err => {
                res.redirect('/signup');
            });
        });
        // Send success page
        res.sendFile(path.join(__dirname, '../Views/success.html'));
    } catch (error) {
        console.error('Error creating user:', error);
        
        // Send error page
        res.status(400).sendFile(path.join(__dirname, '../Views/Failed.html'));
    }
};
