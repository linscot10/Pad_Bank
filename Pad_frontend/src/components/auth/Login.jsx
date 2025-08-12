import React, { useState } from 'react';
import { loginUser } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css'; 

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await loginUser(formData);
            const { token } = res;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(res));

            toast.success('Login successful');

            // Role-based redirection
            switch (res.role) {
                case 'school':
                    navigate('/school/');
                    break;
                case 'sponsor':
                    navigate('/sponsor/');
                    break;
                case 'admin':
                    navigate('/admin/');
                    break;
                default:
                    navigate('/');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>
                        <i className="fas fa-sign-in-alt"></i> Welcome Back
                    </h2>
                    <p>Sign in to your account to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">
                            <i className="fas fa-envelope"></i> Email Address
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
                            <i className="fas fa-lock"></i> Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="login-button"
                        disabled={isLoading || !formData.email || !formData.password}
                    >
                        {isLoading ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i> Signing In...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-sign-in-alt"></i> Sign In
                            </>
                        )}
                    </button>

                    <div className="login-footer">
                        <p>
                            Don't have an account? <Link to="/register">Register here</Link>
                        </p>
                        <p>
                            <Link to="/forgot-password">Forgot password?</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;