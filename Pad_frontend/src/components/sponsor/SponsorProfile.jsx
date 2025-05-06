import React, { useEffect, useState } from 'react';
import { getSponsorProfile } from '../../services/sponsorService';

const SponsorProfileView = () => {
    const [sponsor, setSponsor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
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

    if (loading) return <p>Loading profile...</p>;

    if (!sponsor) return <p>No sponsor profile found.</p>;

    return (
        <div className="card p-4 mb-4 bg-light">
            <h3>Sponsor Profile</h3>
            <p><strong>Organization:</strong> {sponsor.organizationName}</p>
            <p><strong>Contact:</strong> {sponsor.contactNumber}</p>
            <p><strong>Address:</strong> {sponsor.address}</p>
            <p><strong>User:</strong> {sponsor.user?.name} ({sponsor.user?.email})</p>
        </div>
    );
};

export default SponsorProfileView;