import React, { useState } from 'react';
import { loginUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginUser(formData);
            localStorage.setItem('user', JSON.stringify(res));
            toast.success('Login successful');
            navigate('/dashboard');
        } catch (err) {
            toast.error('Login failed');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input className="form-control my-2" type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input className="form-control my-2" type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button className="btn btn-success mt-2">Login</button>
            </form>
        </div>
    );
};

export default Login;
