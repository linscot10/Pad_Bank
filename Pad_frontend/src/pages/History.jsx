import React, { useEffect, useState } from 'react';
import DonationHistory from '../components/sponsor/DonationHistory';
import { getMyDonations } from '../services/sponsorService';

const History = () => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const load = async () => {
            const data = await getMyDonations();
            setDonations(data);
        };
        load();
    }, []);

    return (
        <>
            <h2>Donation History</h2>
            <DonationHistory donations={donations} />
        </>
    );
};

export default History;
