import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            {/* Navigation Bar */}
            <nav className="dashboard-nav">
                <div className="nav-container">
                    <Link className="nav-brand" to="/">
                        <i className="fas fa-heartbeat"></i> PadBank
                    </Link>
                    <div className="nav-actions">
                        <Link to="/register" className="nav-btn outline">
                            <i className="fas fa-user-plus"></i> Register
                        </Link>
                        <Link to="/login" className="nav-btn primary">
                            <i className="fas fa-sign-in-alt"></i> Login
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="dashboard-hero">
                <div className="hero-content">
                    <h1>
                        <span className="hero-highlight">Empowering Girls</span> Through Dignity & Access
                    </h1>
                    <p className="hero-subtitle">
                        A digital platform connecting schools with sanitary pad resources, ensuring no girl misses school due to menstruation.
                    </p>
                    <div className="hero-cta">
                        <Link to="/register" className="cta-btn">
                            <i className="fas fa-rocket"></i> Get Started
                        </Link>
                        <Link to="/about" className="cta-link">
                            Learn more <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
                <div className="hero-image"></div>
            </header>

            {/* Features Section */}
            <section className="dashboard-features">
                <div className="features-container">
                    <h2>
                        <i className="fas fa-star"></i> Our Platform Features
                    </h2>
                    <p className="features-subtitle">
                        Designed to streamline the process of requesting and distributing sanitary pads
                    </p>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-file-upload"></i>
                            </div>
                            <h3>Document Upload</h3>
                            <p>
                                Securely upload and manage student records with our encrypted document management system.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-school"></i>
                            </div>
                            <h3>School Profiles</h3>
                            <p>
                                Maintain accurate school information and track student demographics for better resource allocation.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-box-open"></i>
                            </div>
                            <h3>Pad Requests</h3>
                            <p>
                                Submit and track sanitary pad requests with real-time status updates and notifications.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="dashboard-footer">
                <div className="footer-content">
                    <div className="footer-logo">
                        <i className="fas fa-heartbeat"></i> PadBank
                    </div>
                    <div className="footer-links">
                        <Link to="/about">About Us</Link>
                        <Link to="/contact">Contact</Link>
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms</Link>
                    </div>
                    <div className="footer-copyright">
                        &copy; {new Date().getFullYear()} PadBank  Distribution System. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;