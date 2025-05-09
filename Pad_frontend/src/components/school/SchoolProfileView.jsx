// src/components/school/SchoolProfileView.jsx
import React from 'react';

const SchoolProfileView = ({ school }) => {
    if (!school) return <p>Loading school profile...</p>;
    // console.log("schhollP",school);


    return (
        <div className="container mt-4">
            <div className="card shadow-sm border-0">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">School Profile</h3>
                </div>
                <div className="card-body">
                    <p className="mb-2"><strong>Name:</strong> {school.user.name}</p>
                    {/* <p className="mb-2"><strong>Registration Number:</strong> {school.registrationNumber}</p> */}
                    <p className="mb-2"><strong>County:</strong> {school.county}</p>
                    {/* <p className="mb-2"><strong>Subcounty:</strong> {school.subCounty}</p> */}
                    <p className="mb-2"><strong>Email:</strong> {school.user.email}</p>
                    {/* <p className="mb-0"><strong>Phone:</strong> {school.phone}</p> */}
                </div>
            </div>
        </div>
    );
};

export default SchoolProfileView;
