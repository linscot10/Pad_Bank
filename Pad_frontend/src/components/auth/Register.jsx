import React, { useState } from 'react';
import { registerUser } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
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
            localStorage.setItem('user', JSON.stringify(res.user));

            if (res.token) {
                localStorage.setItem('token', res.token);
            }
            toast.success('Registered successfully');
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed');
        }
    };

    return (
        <div className="container-fluid bg-light vh-100 d-flex justify-content-center align-items-center">
            <div className="row w-100">
                <div className="col-md-6 col-lg-4 p-4 bg-white rounded shadow-sm">
                    <h2 className="text-center mb-4">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                className="form-control my-2"
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control my-2"
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control my-2"
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <select
                                className="form-select my-2"
                                name="role"
                                onChange={handleChange}
                            >
                                <option value=""> select role</option>
                                <option value="school">School</option>
                                <option value="sponsor">Sponsor</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button className="btn btn-primary w-100 mt-3">Register</button>
                    </form>
                    <p className='my-4 text-center'>Have an account? <Link to='/login'>login</Link></p>
                </div>
            </div>
        </div >
    )
}


export default Register;
