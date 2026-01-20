import React from 'react';
import '../styles/Features.css';

function Features() {
    const features = [
        {
            icon: '🤖',
            image: <img src={require('../assets/hero-ai.jpg')} alt="AI-Powered Analysis" />,
            title: 'AI-Powered Analysis',
            description: 'Advanced machine learning algorithms analyze thousands of data points to predict stock movements.'
        },
        {
            icon: '📰',
            image: <img src={require('../assets/hero-news.jpg')} alt="News Sentiment" />,
            title: 'News Sentiment',
            description: 'Real-time analysis of news articles and social media to gauge market sentiment.'
        },
        {
            icon: '📊',
            image: <img src={require('../assets/hero-finance.jpg')} alt="Financial Data" />,
            title: 'Financial Data',
            description: 'Comprehensive financial metrics and historical data to support our recommendations.'
        },
        {
            icon: '🎯',
            image: <img src={require('../assets/hero-insights.jpg')} alt="Actionable Insights" />,
            title: 'Actionable Insights',
            description: 'Clear buy, sell, or hold recommendations backed by data-driven analysis.'
        },

    ];
    return (
        <section className="features">
            <div className="features-container">
                <h2>How We Help You Invest Smarter</h2>
                
                <div className="feature-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.image}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;

