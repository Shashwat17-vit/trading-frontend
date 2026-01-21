const express = require('express');
const passport = require('../config/passport');
const authController = require('../Controllers/authController');
const userController = require('../Controllers/userController');
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
  authController.googleCallback
);

// Route: /auth/google/token (token method - for useGoogleLogin)
router.post('/google/token', authController.googleTokenAuth);

router.post('/signup', userController.postSignup);

// Route: /auth/logout
router.get('/logout', authController.logout);

// Route: /auth/user (get current user)
router.get('/user', authController.getCurrentUser);

module.exports = router;