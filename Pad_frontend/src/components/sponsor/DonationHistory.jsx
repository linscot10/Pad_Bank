import React from 'react';
import './DonationHistory.css'; 

const DonationHistory = ({ donations }) => {
    if (!donations || donations.length === 0) {
        return (
            <div className="donation-history-empty">
                <i className="fas fa-inbox"></i>
                <p>No donations recorded yet</p>
                <p className="empty-subtext">Your donations will appear here</p>
            </div>
        );
    }

    return (
        <div className="donation-history-container">
            <div className="history-header">
                <h2>
                    <i className="fas fa-history"></i> Donation History
                </h2>
                <p>Your past contributions to the program</p>
            </div>

            <div className="donation-cards">
                {donations.map((donation) => (
                    <div key={donation._id} className="donation-card">
                        <div className="donation-badge">
                            <i className="fas fa-box-open"></i>
                            <span>{donation.quantity} pads</span>
                        </div>

                        <div className="donation-details">
                            <div className="donation-date">
                                <i className="fas fa-calendar-alt"></i>
                                {new Date(donation.donatedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>

                            {donation.note && (
                                <div className="donation-note">
                                    <i className="fas fa-comment-alt"></i>
                                    <p>{donation.note}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonationHistory;