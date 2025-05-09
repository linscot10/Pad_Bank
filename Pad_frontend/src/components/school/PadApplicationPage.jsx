import React, { useEffect, useState } from 'react';
import PadApplicationForm from '../../components/school/PadApplicationForm';
import { getSchoolProfile } from '../../services/schoolService';

const PadApplicationPage = () => {
    const token = localStorage.getItem('token');
    const [femaleStudentCount, setFemaleStudentCount] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const s = await getSchoolProfile(token);
            setFemaleStudentCount(s?.femaleStudentCount);
        };
        fetchData();
    }, []);

    return (
        <div>
            {/* <h2 className="mb-4">Apply for Pads</h2> */}
            {femaleStudentCount && <PadApplicationForm token={token} femaleStudentCount={femaleStudentCount} />}
        </div>
    );
};

export default PadApplicationPage;
