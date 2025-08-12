import React, { useState } from 'react';
import { createSponsorProfile } from '../../services/sponsorService';
import './SponsorProfileForm.css'; 

const SponsorProfileForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        organizationName: '',
        contactNumber: '',
        address: ''
    });

    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createSponsorProfile(formData);
            setMessage('Profile created successfully!');
            if (onSuccess) onSuccess();
            // Clear form after successful submission
            setFormData({
                organizationName: '',
                contactNumber: '',
                address: ''
            });
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to create profile. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="sponsor-form-container">
            <div className="form-header">
                <h2>
                    <i className="fas fa-hand-holding-heart"></i> Sponsor Registration
                </h2>
                <p>Complete this form to register your organization as a sponsor</p>
            </div>

            <form onSubmit={handleSubmit} className="sponsor-form">
                <div className="form-group">
                    <label htmlFor="organizationName">
                        <i className="fas fa-building"></i> Organization Name *
                    </label>
                    <input
                        type="text"
                        id="organizationName"
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleChange}
                        required
                        placeholder="Enter organization name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contactNumber">
                        <i className="fas fa-phone"></i> Contact Number
                    </label>
                    <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Enter contact number"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">
                        <i className="fas fa-map-marker-alt"></i> Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter organization address"
                    />
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isSubmitting || !formData.organizationName}
                >
                    {isSubmitting ? (
                        <>
                            <i className="fas fa-spinner fa-spin"></i> Processing...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-user-plus"></i> Register Sponsor
                        </>
                    )}
                </button>

                {message && (
                    <div className={`form-message ${message.includes('successfully') ? 'success' : 'error'}`}>
                        <i className={`fas ${message.includes('successfully') ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default SponsorProfileForm;