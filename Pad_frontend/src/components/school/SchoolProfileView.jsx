// src/components/school/SchoolProfileView.jsx
import React from 'react';

const SchoolProfileView = ({ school }) => {
    if (!school) return <p>Loading school profile...</p>;

    return (
        <div>
            <h3 className="mb-3">School Profile</h3>
            <p><strong>Name:</strong> {school.user.name}</p>
            {/* <p><strong>Registration Number:</strong> {school.registrationNumber}</p> */}
            <p><strong>County:</strong> {school.county}</p>
            {/* <p><strong>Subcounty:</strong> {school.subCounty}</p> */}
            <p><strong>Email:</strong> {school.user.email}</p>
            {/* <p><strong>Phone:</strong> {school.phone}</p> */}
        </div>
    );
};

export default SchoolProfileView;
