import React, { useEffect, useState } from 'react';
import { getAllDonations } from '../../services/adminService';

const DonationsList = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token'); // Get token from localStorage

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const data = await getAllDonations(token); // Pass token to the service
                setDonations(data);
            } catch (err) {
                console.error('Failed to fetch donations:', err);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };
        fetchDonations();
    }, [token]);

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Donations List</h2>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : donations.length === 0 ? (
                <p className="text-center">No donations available at the moment.</p>
            ) : (
                <div className="list-group">
                    {donations.map((donation) => (
                        <div key={donation._id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5>{donation.quantity} pads</h5>
                                <p>
                                    <strong>From: </strong>
                                    {donation.sponsor?.organizationName || 'Anonymous'}
                                </p>
                                <p>
                                    <strong>Donated on: </strong>
                                    {new Date(donation.donatedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DonationsList;
