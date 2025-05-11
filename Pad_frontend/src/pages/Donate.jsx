import React, { useState } from 'react';
import SponsorDonationForm from '../components/sponsor/SponsorDonationForm';
import { getMyDonations } from '../services/sponsorService';

const Donate = () => {
    const [donations, setDonations] = useState([]);

    const reloadDonations = async () => {
        const data = await getMyDonations();
        setDonations(data);
    };

    return (
        <>
            <h2>Make a Donation</h2>
            <SponsorDonationForm onSuccess={reloadDonations} />
        </>
    );
};

export default Donate;
