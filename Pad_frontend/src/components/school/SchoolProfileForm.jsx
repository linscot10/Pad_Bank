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
            <div className="profile-form-card p-4 bg-white rounded shadow-sm">
                <h2 className="text-center mb-4">School Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="schoolName" className="form-label">School Name</label>
                        <input
                            id="schoolName"
                            name="schoolName"
                            className="form-control"
                            placeholder="Enter School Name"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="county" className="form-label">County</label>
                        <input
                            id="county"
                            name="county"
                            className="form-control"
                            placeholder="Enter County"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="femaleStudentCount" className="form-label">Number of Female Students</label>
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

                    <button type="submit" className="btn btn-primary w-100 mt-4">Save</button>
                </form>
            </div>
        </div>
    );
};

export default SchoolProfileForm;
