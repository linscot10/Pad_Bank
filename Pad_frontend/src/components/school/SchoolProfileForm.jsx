// src/components/School/SchoolProfileForm.jsx
import React, { useState } from 'react';
import { registerSchool } from '../../services/schoolService';

const SchoolProfileForm = ({ token, onSuccess }) => {
    const [form, setForm] = useState({
        schoolName: '',
        county: '',
        femaleStudentCount: ''
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await registerSchool(form, token);
        alert(response.message);
        if (onSuccess) {
            // Call onSuccess with the femaleStudentCount to pass the data to parent or another component
            onSuccess(form.femaleStudentCount);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-12 col-lg-10">
                    <div className="profile-form-card p-5 bg-white rounded-4 shadow border">
                        <h2 className="text-center mb-4 text-primary fw-bold">📘 School Profile</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="schoolName" className="form-label fw-semibold">School Name</label>
                                <input
                                    id="schoolName"
                                    name="schoolName"
                                    className="form-control"
                                    placeholder="Enter School Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="county" className="form-label fw-semibold">County</label>
                                <input
                                    id="county"
                                    name="county"
                                    className="form-control"
                                    placeholder="Enter County"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="femaleStudentCount" className="form-label fw-semibold">Number of Female Students</label>
                                <input
                                    id="femaleStudentCount"
                                    name="femaleStudentCount"
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter number of girls"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
                                💾 Save Profile
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolProfileForm;
