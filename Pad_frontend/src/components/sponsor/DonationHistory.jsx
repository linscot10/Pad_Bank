import React from 'react';

const DonationHistory = ({ donations }) => {
    if (!donations || donations.length === 0) {
        return <p className="text-muted">No donations yet.</p>;
    }

    return (
        <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="mb-3">Donation History</h3>
            <ul className="list-group">
                {donations.map((donation) => (
                    <li key={donation._id} className="list-group-item d-flex justify-content-between align-items-start">
                        <div>
                            <strong>Quantity:</strong> {donation.quantity} <br />
                            {donation.note && <><strong>Note:</strong> {donation.note}</>}
                        </div>
                        <small>{new Date(donation.donatedAt).toLocaleDateString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DonationHistory;
