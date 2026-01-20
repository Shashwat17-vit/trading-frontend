import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Navbar.css';

// RECEIVE onSignupClick function as a prop from Home.js
function Navbar({ onSignupClick }) {
    return (
        <nav className="navbar">
            <div className="logo">Infostock</div>
            <div className="nav-links">
                <Link to="/" className="nav-button">Home</Link>
                {/* When clicked, triggers the signup modal */}
                <button onClick={onSignupClick} className="nav-button">Sign Up</button>
            </div>
        </nav>
    );
}
export default Navbar;

