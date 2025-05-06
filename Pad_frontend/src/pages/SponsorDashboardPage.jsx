import React, { useEffect, useState } from 'react';
import SponsorProfileForm from '../components/sponsor/SponsorProfileForm';
import SponsorDonationForm from '../components/sponsor/SponsorDonationForm';
import DonationHistory from '../components/sponsor/DonationHistory';
import { getMyDonations } from '../services/sponsorService';
import SponsorProfile from '../components/sponsor/SponsorProfile';


const SponsorDashboardPage = () => {
    const token = localStorage.getItem('token');
    const [donations, setDonations] = useState([]);

    const loadDonations = async () => {
        const data = await getMyDonations(token);
        setDonations(data);
    };

    useEffect(() => {
        loadDonations();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Sponsor Dashboard</h1>
            <SponsorProfile />


            <div className="section-card p-4 mb-4 bg-white rounded shadow-sm">
                <SponsorProfileForm onSuccess={loadDonations} />
            </div>

            <div className="section-card p-4 mb-4 bg-white rounded shadow-sm">
                <SponsorDonationForm onSuccess={loadDonations} />
            </div>

            <DonationHistory donations={donations} />
        </div>
    );
};

export default SponsorDashboardPage;
