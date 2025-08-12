import React, { useState } from 'react';
import { donatePads } from '../../services/sponsorService';
import './SponsorDonationForm.css'; // Create this CSS file

const SponsorDonationForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({ quantity: '', note: '' });
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        
        
        setIsSubmitting(true);
        try {
            await donatePads(formData);
            setMessage('Donation submitted successfully!');
            setFormData({ quantity: '', note: '' });
            if (onSuccess) onSuccess();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to submit donation. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="donation-form-container">
            <div className="form-header">
                <h2>
                    <i className="fas fa-donate"></i> Make a Donation
                </h2>
                <p>Help schools in need by donating sanitary pads</p>
            </div>

            <form onSubmit={handleSubmit} className="donation-form">
                <div className="form-group">
                    <label htmlFor="quantity">
                        <i className="fas fa-boxes"></i> Quantity *
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        placeholder="Number of pads to donate"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="note">
                        <i className="fas fa-comment-alt"></i> Note (Optional)
                    </label>
                    <textarea
                        id="note"
                        name="note"
                        rows="4"
                        value={formData.note}
                        onChange={handleChange}
                        placeholder="Any special instructions or messages"
                    />
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isSubmitting || !formData.quantity}
                >
                    {isSubmitting ? (
                        <>
                            <i className="fas fa-spinner fa-spin"></i> Processing...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-hand-holding-heart"></i> Submit Donation
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

export default SponsorDonationForm;