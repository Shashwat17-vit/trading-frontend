import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
    const navigate = useNavigate();
    
    // ============ STATE ============
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // ============ GOOGLE OAUTH ============
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                // Send token to backend
                const res = await fetch('http://localhost:5000/auth/google/token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: response.access_token })
                });
                
                const userData = await res.json();
                
                if (userData.success) {
                    console.log('Google login success:', userData);
                    // Store user data if needed
                    localStorage.setItem('user', JSON.stringify(userData.user));
                    // Redirect to home
                    navigate('/');
                } else {
                    setError('Google login failed. Please try again.');
                }
                
            } catch (error) {
                console.error('Google login error:', error);
                setError('Google login failed. Please try again.');
            }
        },
        onError: (error) => {
            console.error('Google Login Failed:', error);
            setError('Could not connect to Google');
        }
    });

    // ============ EMAIL/PASSWORD LOGIN ============
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Send to your login endpoint
            const res = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await res.json();
            
            if (data.success) {
                console.log('Login success:', data);
                // Store user data
                localStorage.setItem('user', JSON.stringify(data.user));
                // Redirect to home
                navigate('/');
            } else {
                setError(data.message || 'Invalid email or password');
            }
            
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please try again.');
        }
    };

    // ============ JSX ============
    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p>Login to continue your investment journey</p>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {/* ===== GOOGLE LOGIN ===== */}
                <button className="google-login-btn" onClick={handleGoogleLogin}>
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

                {/* ===== EMAIL/PASSWORD LOGIN FORM ===== */}
                <form onSubmit={handleSubmit} className="login-form">
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
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                        />
                    </div>

                    <div className="forgot-password">
                        <a href="/forgot-password">Forgot password?</a>
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>

                <p className="signup-link">
                    Don't have an account? <a href="/signup">Sign up</a>
                </p>

                <button className="back-home-btn" onClick={() => navigate('/')}>
                    ← Back to Home
                </button>
            </div>
        </div>
    );
}

export default Login;

