import React, { useEffect, useState } from 'react';
import { getAllRequests, allocatePads, disbursePads } from '../../services/adminService';

const PadApplications = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    const fetchRequests = async () => {
        try {
            setLoading(true); // Set loading to true before fetching
            const data = await getAllRequests(token);
            setRequests(data);
            console.log(data)
        } catch (err) {
            console.error('Error fetching requests:', err);
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAllocate = async (id) => {
        await allocatePads(id, token);
        fetchRequests();
    };

    const handleDisburse = async (id) => {
        await disbursePads(id, token);
        fetchRequests();
    };

    return (
        <div className="container my-1">
            <h3 className="text-center mb-4">Pad Applications</h3>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : requests.length === 0 ? (
                <p className="text-center">No applications available at the moment.</p>
            ) : (
                <ul className="list-group">
                    {requests.map((req) => (
                        <li key={req._id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5>{req.school.schoolName}</h5>
                                <p>Status: <strong>{req.status}</strong></p>

                            </div>
                            <div>
                                {req.status === 'applied' && (
                                    <button
                                        className="btn btn-outline-warning me-2 rounded-pill px-4 py-2"
                                        onClick={() => handleAllocate(req._id)}
                                    >
                                        <i className="bi bi-arrow-right-circle me-2"></i> Allocate
                                    </button>
                                )}
                                {req.status === 'a  llocated' && (
                                    <button
                                        className="btn btn-outline-success rounded-pill px-4 py-2"
                                        onClick={() => handleDisburse(req._id)}
                                    >
                                        <i className="bi bi-check-circle me-2"></i> Disburse
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PadApplications;
