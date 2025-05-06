import React, { useState } from 'react';
import { donatePads } from '../../services/sponsorService';

const SponsorDonationForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({ quantity: '', note: '' });
    const [message, setMessage] = useState('');

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await donatePads(formData);
            setMessage('Donation submitted successfully');
            setFormData({ quantity: '', note: '' });
            if (onSuccess) onSuccess();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to submit donation');
        }
    };

    return (
        <div className="bg-light p-4 rounded shadow-sm mb-4">
            <h3>Donate Sanitary Pads</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <label>Quantity</label>
                    <input type="number" name="quantity" className="form-control" value={formData.quantity} onChange={handleChange} required />
                </div>
                <div className="form-group mb-3">
                    <label>Note (optional)</label>
                    <textarea name="note" className="form-control" value={formData.note} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-success">Donate</button>
                {message && <div className="mt-3 text-info">{message}</div>}
            </form>
        </div>
    );
};

export default SponsorDonationForm;
