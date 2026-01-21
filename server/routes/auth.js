const express = require('express');
const passport = require('../config/passport');
const axios = require('axios');
const User = require('../Models/User');
const router = express.Router();

// Route: /auth/google (redirect method)
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

// Route: /auth/google/callback (redirect method)
router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/login' 
  }),
  (req, res) => {
    // Success! Redirect to dashboard or home
    res.redirect('http://localhost:5000');
  }
);

// Route: /auth/google/token (token method - for useGoogleLogin)
router.post('/google/token', async (req, res) => {
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
});

// Route: /auth/logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Route: /auth/user (get current user)
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// 🔍 DEBUG ROUTE: Check all users in database
router.get('/debug/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      totalUsers: users.length,
      users: users.map(u => ({
        id: u._id,
        email: u.email,
        name: u.name,
        googleId: u.googleId,
        createdAt: u.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;