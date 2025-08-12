import React, { useEffect, useState } from 'react';
import PadApplicationForm from '../../components/school/PadApplicationForm';
import { getSchoolProfile } from '../../services/schoolService';
import { getApplicationHistory } from '../../services/padApplicationService';
import './form.css'
const PadApplicationPage = () => {
    const token = localStorage.getItem('token');
    const [femaleStudentCount, setFemaleStudentCount] = useState(null);
    const [applicationHistory, setApplicationHistory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const profile = await getSchoolProfile(token);
            setFemaleStudentCount(profile?.femaleStudentCount);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getApplicationHistory(token);
                setApplicationHistory(history);
            } catch (error) {
                console.error('Failed to fetch application history:', error);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="pad-application-page">
            {femaleStudentCount && (
                <PadApplicationForm
                    token={token}
                    femaleStudentCount={femaleStudentCount}
                />
            )}

            <div className="application-history">
                <h3>
                    <i className="fas fa-history"></i> Application History
                </h3>
                {applicationHistory.length === 0 ? (
                    <p>No previous applications found.</p>
                ) : (
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Quantity Requested</th>
                                <th>Status</th>
                                <th>Allocated Pads</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicationHistory.map((app, idx) => (
                                <tr key={idx}>
                                    <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                                    <td>{app.quantityRequested || app.numberOfGirls}</td>
                                    <td>{app.status}</td>
                                    <td>{app.allocatedPads || 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default PadApplicationPage;
