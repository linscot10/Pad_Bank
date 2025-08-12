import React from 'react';
import SponsorProfile from '../components/sponsor/SponsorProfile';
import SponsorProfileForm from '../components/sponsor/SponsorProfileForm';
import './Profile.css'; 

const Profile = () => {
    return (
        <div className="profile-page">
            <div className="profile-heade">
                <h1>
                    <i className="fas fa-user-cog"></i> Sponsor Account
                </h1>
                <p className="subtitle">Manage your organization's profile and information</p>
            </div>

            <div className="profile-content">
                <div className="profile-section">
                    <div className="section-header">
                        <h2>
                            <i className="fas fa-id-card"></i> Current Profile
                        </h2>
                        <p>View your organization's registered information</p>
                    </div>
                    <SponsorProfile />
                </div>

                <div className="profile-section">
                    <div className="section-header">
                        <h2>
                            <i className="fas fa-edit"></i> Update Profile
                        </h2>
                        <p>Edit your organization's details</p>
                    </div>
                    <SponsorProfileForm />
                </div>
            </div>
        </div>
    );
};

export default Profile;