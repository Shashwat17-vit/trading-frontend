import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';  // ← Add this
import '../styles/SignupForm.css';


function SignupForm({ isOpen, onClose }) {
    // ============ STATE (existing) ============
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // ============ GOOGLE OAUTH ============
    const handleGoogleSignup = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                // Send token to backend
                const res = await fetch('http://localhost:5000/auth/google/token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: response.access_token })
                });
                
                const userData = await res.json();
                console.log('Google signup success:', userData);
                
                // Close modal and redirect
                onClose();
                // You can redirect or update global state here
                
            } catch (error) {
                console.error('Google signup error:', error);
                alert('Google signup failed. Please try again.');
            }
        },
        onError: (error) => {
            console.error('Google Login Failed:', error);
            alert('Could not connect to Google');
        }
    });

    if (!isOpen) return null;

    // ============ CUSTOM EMAIL/PASSWORD SIGNUP (existing) ============
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            // Send to your custom signup endpoint
            const res = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await res.json();
            console.log('Custom signup success:', data);
            
            // Close modal and redirect
            onClose();
            
        } catch (error) {
            console.error('Signup error:', error);
            alert('Signup failed. Please try again.');
        }
    };

    // ============ JSX (mostly unchanged) ============
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="signup-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                
                <h2>Create Your Account</h2>
                <p className="subtitle">Start your investment journey today</p>

                {/* ===== GOOGLE SIGNUP (TOP) ===== */}
                <button className="google-signup-btn" onClick={handleGoogleSignup}>
                    <svg width="18" height="18" viewBox="0 0 18 18">
                        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                        <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                        <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                    </svg>
                    Continue with Google
                </button>

                <div className="divider">
                    <span>OR</span>
                </div>

                {/* ===== CUSTOM EMAIL/PASSWORD SIGNUP (BOTTOM) ===== */}
                <form onSubmit={handleSubmit} action="/signup" method="POST">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your Username"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Create a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength="6"
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        Create Account
                    </button>
                </form>

                <p className="login-link">
                    Already have an account? <a href="/login">Log in</a>
                </p>
            </div>
        </div>
    );
}

export default SignupForm;