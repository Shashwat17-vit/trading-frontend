import React from 'react';
import '../styles/Hero.css';

function Hero({ onSignupClick }) {
    return (
        <section className="hero">
            <h1>Welcome to Infostock</h1>
            <p>
                Make smarter investment decisions with AI-powered stock analysis. 
                We analyze news articles and financial data to provide you with 
                actionable insights on your stock portfolio decisions.
            </p>
            <button onClick={onSignupClick} className="cta-button">Get Started Today</button>
        </section>
    );
}

export default Hero;

