const express = require('express');
const passport = require('../config/passport');
const router = express.Router();

// Route: /auth/google
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

// Route: /auth/google/callback
router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/login' 
  }),
  (req, res) => {
    // Success! Redirect to dashboard or home
    res.redirect('http://localhost:3000');
  }
);

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

module.exports = router;