import React, { useState } from 'react';
import { registerUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'school',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerUser(formData);
            localStorage.setItem('user', JSON.stringify(res));
            toast.success('Registered successfully');
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input className="form-control my-2" type="text" name="name" placeholder="Name" onChange={handleChange} />
                <input className="form-control my-2" type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input className="form-control my-2" type="password" name="password" placeholder="Password" onChange={handleChange} />
                <select className="form-select my-2" name="role" onChange={handleChange}>
                    <option value="school">School</option>
                    <option value="sponsor">Sponsor</option>
                    <option value="admin">Admin</option>
                </select>
                <button className="btn btn-primary mt-2">Register</button>
            </form>
        </div>
    );
};

export default Register;
