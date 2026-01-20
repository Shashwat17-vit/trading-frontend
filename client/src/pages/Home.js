import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
import SignupForm from '../components/SignupForm';
import '../styles/Home.css';

export default function Home() {
    // STATE: Controls whether signup modal is visible
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    

    // FUNCTION: Opens signup modal (passed to Hero component)
    const openSignup = () => setIsSignupOpen(true);
    
    // FUNCTION: Closes signup modal (passed to SignupForm)
    const closeSignup = () => setIsSignupOpen(false);

    return (
        <div className="App">
            {/* Pass openSignup function to both Navbar and Hero */}
            <Navbar onSignupClick={openSignup} />
            <Hero onSignupClick={openSignup} />
            
            <Features />
            <Footer />
            
            {/* Modals - show based on state */}
            <SignupForm isOpen={isSignupOpen} onClose={closeSignup} />
        </div>
    );
}