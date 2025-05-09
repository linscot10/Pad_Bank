import React, { useEffect, useState } from 'react';
import SchoolProfileForm from '../components/school/SchoolProfileForm';
import DocumentUpload from '../components/school/DocumentUpload';
import SchoolProfileView from '../components/school/SchoolProfileView';
import { getSchoolProfile } from '../services/schoolService';

const SchoolDashboardPage = () => {
    const token = localStorage.getItem('token');
    const [school, setSchool] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const s = await getSchoolProfile(token);
            setSchool(s);
        };
        fetchProfile();
    }, []);

    return (
        <div>
            {/* <h2 className="mb-4">School Profile & Document Upload</h2> */}

            {school && <SchoolProfileView school={school} />}

            <div className="row mt-4">
                <div className="col-md-6">
                    <SchoolProfileForm token={token} onSuccess={() => window.location.reload()} />
                </div>
                <div className="col-md-6">
                    <DocumentUpload token={token} />
                </div>
            </div>
        </div>
    );
};

export default SchoolDashboardPage;

