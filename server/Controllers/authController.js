const axios = require('axios');
const User = require('../Models/User');

// Handle Google OAuth token authentication
exports.googleTokenAuth = async (req, res) => {
    try {
        const { token } = req.body;

        // Get user info from Google using the access token
        const googleResponse = await axios.get(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
        );

        const profile = googleResponse.data;
        
        // Check if user exists in database
        let user = await User.findOne({ googleId: profile.sub });

        if (!user) {
            // Create new user
            user = await User.create({
                googleId: profile.sub,
                email: profile.email,
                name: profile.name,
                profilePicture: profile.picture
            });
            console.log('✅ New user created:', user.email);
        } else {
            console.log('✅ Existing user logged in:', user.email);
        }

        // Create session
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Session creation failed' });
            }
            
            res.json({
                success: true,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    profilePicture: user.profilePicture
                }
            });
        });

    } catch (error) {
        console.error('Google token error:', error);
        res.status(500).json({ 
            error: 'Authentication failed',
            message: error.message 
        });
    }
};

// Handle user logout
exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.redirect('/');
    });
};

// Get current authenticated user
exports.getCurrentUser = (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
};

// Handle Google OAuth redirect callback (for redirect method)
exports.googleCallback = (req, res) => {
    // Success! Redirect to dashboard or home
    res.redirect('http://localhost:5000');
};

