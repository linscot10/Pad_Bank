import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <>
            {/* Navigation Bar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <div className="container">
                    <Link className="navbar-brand fw-bold text-primary" to="/">SanitaryPad System</Link>
                    <div className="ms-auto">
                        <Link to="/register" className="btn btn-outline-primary me-2">Register</Link>
                        <Link to="/login" className="btn btn-primary">Login</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="bg-light py-5 text-center">
                <div className="container">
                    <h1 className="display-5 fw-bold text-primary">Empowering Girls Through Access</h1>
                    <p className="lead mt-3 text-muted">
                        A digital platform for managing school profiles, uploading student documents, and applying for sanitary pads with ease and transparency.
                    </p>
                    <Link to="/register" className="btn btn-success btn-lg mt-3">Get Started</Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-5">
                <div className="container">
                    <h2 className="text-center fw-bold mb-5">What You Can Do</h2>
                    <div className="row text-center">
                        <div className="col-md-4 mb-4">
                            <div className="card p-4 shadow-sm border-0 h-100">
                                <h5 className="text-primary fw-bold">📁 Upload Documents</h5>
                                <p className="text-muted mt-2">Easily upload student records and documents for safe digital storage and review.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card p-4 shadow-sm border-0 h-100">
                                <h5 className="text-primary fw-bold">🏫 Manage School Profiles</h5>
                                <p className="text-muted mt-2">Register and maintain accurate information about schools and student demographics.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card p-4 shadow-sm border-0 h-100">
                                <h5 className="text-primary fw-bold">💼 Apply for Pads</h5>
                                <p className="text-muted mt-2">Submit pad requests based on the number of girls and track distribution status.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-top py-4 mt-5 text-center text-muted">
                <div className="container">
                    &copy; {new Date().getFullYear()} SanitaryPad Distribution System. All rights reserved.
                </div>
            </footer>
        </>
    );
};

export default Dashboard;
