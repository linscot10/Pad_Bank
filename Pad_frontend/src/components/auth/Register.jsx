import React, { useState } from 'react';
import { registerUser } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Register.css'; // Create this CSS file

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await registerUser(formData);
            localStorage.setItem('user', JSON.stringify(res.user));

            if (res.token) {
                localStorage.setItem('token', res.token);
            }
            toast.success('Registration successful! Welcome to our platform');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <h2>
                        <i className="fas fa-user-plus"></i> Create Account
                    </h2>
                    <p>Join our platform to get started</p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label htmlFor="name">
                            <i className="fas fa-user"></i> Full Name *
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            <i className="fas fa-envelope"></i> Email Address *
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            <i className="fas fa-lock"></i> Password *
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">
                            <i className="fas fa-user-tag"></i> Account Type *
                        </label>
                        <select
                            id="role"
                            name="role"
                            className="role-select"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select your role</option>
                            <option value="school">School</option>
                            <option value="sponsor">Sponsor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="register-button"
                        disabled={isLoading || !formData.name || !formData.email || !formData.password || !formData.role}
                    >
                        {isLoading ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i> Registering...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-user-plus"></i> Create Account
                            </>
                        )}
                    </button>

                    <div className="register-footer">
                        <p>
                            Already have an account? <Link to="/login">Sign in here</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;