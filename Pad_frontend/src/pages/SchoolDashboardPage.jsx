import React, { useEffect, useState } from 'react';
import SchoolProfileForm from '../components/school/SchoolProfileForm';
import DocumentUpload from '../components/school/DocumentUpload';
import SchoolProfileView from '../components/school/SchoolProfileView';
import { getSchoolProfile } from '../services/schoolService';


const SchoolDashboardPage = () => {
    const token = localStorage.getItem('token');
    const [school, setSchool] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const s = await getSchoolProfile(token);
                setSchool(s);
            } catch (error) {
                console.error("Error loading profile:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [token]);

    return (
        <div className="school-dashboard">
            {/* Loading State */}
            {loading && (
                <div className="dashboard-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading school information...</p>
                </div>
            )}

            {/* Main Content */}
            <div className="dashboard-content">
                {/* Profile View */}
                {school && <SchoolProfileView school={school} />}

                {/* Forms Section */}
                <div className="dashboard-forms">
                    <div className="form-section">
                        <SchoolProfileForm 
                            token={token} 
                            onSuccess={() => window.location.reload()} 
                        />
                    </div>
                    <div className="form-section">
                        <DocumentUpload token={token} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolDashboardPage;