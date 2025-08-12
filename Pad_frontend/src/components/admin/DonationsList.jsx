import React, { useEffect, useState } from 'react';
import { getAllDonations } from '../../services/adminService';
import './DonationsList.css'; 

const DonationsList = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                setLoading(true);
                const data = await getAllDonations(token);
                setDonations(data);
            } catch (err) {
                console.error('Failed to fetch donations:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchDonations();
    }, [token]);

    return (
        <div className="donations-dashboard">
            <div className="dashboard-header">
                <h2>
                    <i className="fas fa-hand-holding-heart"></i> Donations Received
                </h2>
                <p className="subtitle">View all sanitary pad donations from sponsors</p>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading donations...</p>
                </div>
            ) : donations.length === 0 ? (
                <div className="empty-state">
                    <i className="fas fa-inbox"></i>
                    <p>No donations have been received yet</p>
                    <p className="empty-subtext">Check back later or contact potential sponsors</p>
                </div>
            ) : (
                <div className="donations-grid">
                    {donations.map((donation) => (
                        <div key={donation._id} className="donation-card">
                            <div className="donation-badge">
                                <i className="fas fa-box-open"></i>
                                <span>{donation.quantity} pads</span>
                            </div>

                            <div className="donation-details">
                                <h3>
                                    {donation.sponsor?.organizationName || 'Anonymous Donor'}
                                </h3>

                                <div className="detail-row">
                                    <i className="fas fa-calendar-alt"></i>
                                    <span>
                                        Donated on {new Date(donation.donatedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>

                                {donation.sponsor?.contactEmail && (
                                    <div className="detail-row">
                                        <i className="fas fa-envelope"></i>
                                        <span>{donation.sponsor.contactEmail}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DonationsList;