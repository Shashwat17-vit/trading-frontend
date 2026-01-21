const axios = require('axios');
const bcrypt = require('bcryptjs');
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

// Handle email/password login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check if user has a password (not a Google-only user)
        if (!user.password) {
            return res.status(401).json({
                success: false,
                message: 'Please login with Google'
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Create session
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: 'Session creation failed'
                });
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

        console.log('✅ User logged in:', user.email);

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Login failed',
            message: error.message
        });
    }
};

// Handle email/password signup
exports.signup = async (req, res) => {
    try {
        const { email, fullName, password } = req.body;

        // Validate input
        if (!email || !fullName || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            email,
            name: fullName,
            password: hashedPassword
        });

        console.log('✅ New user created:', user.email);

        // Create session
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: 'Session creation failed'
                });
            }

            res.json({
                success: true,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name
                }
            });
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            error: 'Signup failed',
            message: error.message
        });
    }
};
