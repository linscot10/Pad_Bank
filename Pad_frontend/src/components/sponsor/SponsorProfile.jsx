import React, { useEffect, useState } from 'react';
import { getSponsorProfile } from '../../services/sponsorService';
import './SponsorProfileView.css'; 

const SponsorProfileView = () => {
    const [sponsor, setSponsor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await getSponsorProfile();
                setSponsor(data);
            } catch (err) {
                console.error('Error fetching sponsor profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="profile-loading">
                <div className="loading-spinner"></div>
                <p>Loading sponsor profile...</p>
            </div>
        );
    }

    if (!sponsor) {
        return (
            <div className="profile-empty">
                <i className="fas fa-user-slash"></i>
                <p>No sponsor profile found</p>
                <p className="empty-subtext">Please complete your sponsor registration</p>
            </div>
        );
    }

    return (
        <div className="sponsor-profile-card">
            <div className="profile-header">
                <h2>
                    <i className="fas fa-hand-holding-heart"></i> Sponsor Profile
                </h2>
                <p className="profile-subtitle">Your organization's information</p>
            </div>

            <div className="profile-content">
                <div className="profile-section">
                    <div className="profile-item">
                        <div className="item-icon">
                            <i className="fas fa-building"></i>
                        </div>
                        <div className="item-content">
                            <h4>Organization</h4>
                            <p>{sponsor.organizationName}</p>
                        </div>
                    </div>

                    <div className="profile-item">
                        <div className="item-icon">
                            <i className="fas fa-phone"></i>
                        </div>
                        <div className="item-content">
                            <h4>Contact Number</h4>
                            <p>{sponsor.contactNumber || 'Not provided'}</p>
                        </div>
                    </div>

                    <div className="profile-item">
                        <div className="item-icon">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div className="item-content">
                            <h4>Address</h4>
                            <p>{sponsor.address || 'Not provided'}</p>
                        </div>
                    </div>

                    <div className="profile-item">
                        <div className="item-icon">
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="item-content">
                            <h4>Account Information</h4>
                            <p>{sponsor.user?.name} ({sponsor.user?.email})</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SponsorProfileView; 