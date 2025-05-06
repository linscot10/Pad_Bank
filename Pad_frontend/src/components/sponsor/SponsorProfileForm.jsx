import React, { useState } from 'react';
import { createSponsorProfile } from '../../services/sponsorService';

const SponsorProfileForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        organizationName: '',
        contactNumber: '',
        address: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await createSponsorProfile(formData);
            setMessage('Profile created successfully');
            if (onSuccess) onSuccess();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to create profile');
        }
    };

    return (
        <div className="bg-light p-4 rounded shadow-sm mb-4">
            <h3>Create Sponsor Profile</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <label>Organization Name</label>
                    <input type="text" name="organizationName" className="form-control" value={formData.organizationName} onChange={handleChange} required />
                </div>
                <div className="form-group mb-2">
                    <label>Contact Number</label>
                    <input type="text" name="contactNumber" className="form-control" value={formData.contactNumber} onChange={handleChange} />
                </div>
                <div className="form-group mb-3">
                    <label>Address</label>
                    <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                {message && <div className="mt-3 text-info">{message}</div>}
            </form>
        </div>
    );
};

export default SponsorProfileForm;
