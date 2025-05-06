// src/pages/SchoolDashboardPage.jsx
import React, { useEffect, useState } from 'react';
import SchoolProfileForm from '../components/school/SchoolProfileForm';
import DocumentUpload from '../components/school/DocumentUpload';
import PadApplicationForm from '../components/school/PadApplicationForm';
import { getSchoolProfile } from '../services/schoolService';
import { getApplicationStatus } from '../services/padApplicationService';
import { useNavigate } from 'react-router-dom';
import SchoolProfileView from '../components/school/SchoolProfileView';

const SchoolDashboardPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [school, setSchool] = useState(null);
    const [application, setApplication] = useState(null);
    const [femaleStudentCount, setFemaleStudentCount] = useState(null);

    useEffect(() => {

        loadData();
    }, []);

    const loadData = async () => {
        const s = await getSchoolProfile(token);
        const a = await getApplicationStatus(token);
        setSchool(s);
        setApplication(a);
        if (s && s.femaleStudentCount) {
            setFemaleStudentCount(s.femaleStudentCount); // Set femaleStudentCount when profile is fetched
        }
    };

    // useEffect(() => {
    //     loadData();
    // }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">School Dashboard</h1>

            {school && (
                <div className="section-card p-4 mb-4 bg-white rounded shadow-sm">
                    <SchoolProfileView school={school} />
                </div>
            )}

            {/* Application Status Section */}
            {application && (
                <div className="section-card p-4 bg-white rounded shadow-sm">
                    <h3 className="text-center mb-3">Application Status</h3>
                    <p><strong>Status:</strong> {application.status}</p>
                    <p><strong>Requested:</strong> {application.quantityRequested || application.numberOfGirls}</p>
                    <p><strong>Allocated:</strong> {application.allocatedPads}</p>
                </div>
            )}

            {/* School Profile Section */}
            <div className="section-card p-4 mb-4 bg-light rounded shadow-sm">
                <SchoolProfileForm token={token} onSuccess={loadData} />
            </div>

            {/* Document Upload Section */}
            <div className="section-card p-4 mb-4 bg-light rounded shadow-sm">
                <DocumentUpload token={token} />
            </div>

            {/* Pad Application Form Section */}
            {femaleStudentCount && (
                <div className="section-card p-4 mb-4 bg-light rounded shadow-sm">
                    <PadApplicationForm token={token} femaleStudentCount={femaleStudentCount} />
                </div>
            )}


        </div>
    );
};

export default SchoolDashboardPage;
