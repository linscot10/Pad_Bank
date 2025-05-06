import React, { useState } from 'react';
import { loginUser } from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const res = await loginUser(formData);
    //         const { token, user } = res;

    //         // Save token and user separately
    //         localStorage.setItem('token', token);
    //         localStorage.setItem('user', JSON.stringify(user));

    //         toast.success('Login successful');

    //         // Role-based redirection
    //         switch (user.role) {
    //             case 'school':
    //                 navigate('/school/dashboard');
    //                 break;
    //             case 'sponsor':
    //                 navigate('/sponsor/dashboard');
    //                 break;
    //             case 'admin':
    //                 navigate('/admin/dashboard');
    //                 break;
    //             default:
    //                 navigate('/');
    //         }

    //     } catch (err) {
    //         toast.error('Login failed');
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

           
            const res = await loginUser(formData);
            const { token, user } = res;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(res));
            
            toast.success('Login successful');
            navigate('/school/dashboard');
        } catch (err) {
            toast.error('Login failed');
        }
    };

    return (
        <div className="row w-100 mt-5">
            <div className="col-md-6 col-lg-4 p-4 bg-white rounded shadow-sm">
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
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
                    <button className="btn btn-success w-100 mt-3">Login</button>
                </form>
                <p className='my-4 text-center'>dont have  an account? <Link to='/register'>register</Link></p>
            </div>
        </div>
    );
};

export default Login;
