import React, { useEffect, useState } from 'react';
import { getAllRequests, allocatePads, disbursePads } from '../../services/adminService';

import '../../../src/pad.css'
const PadApplications = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const data = await getAllRequests(token);
            setRequests(data);
        } catch (err) {
            console.error('Error fetching requests:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAllocate = async (id) => {
        try {
            await allocatePads(id, token);
            fetchRequests();
        } catch (error) {
            console.error('Allocation failed:', error);
        }
    };

    const handleDisburse = async (id) => {
        try {
            await disbursePads(id, token);
            fetchRequests();
        } catch (error) {
            console.error('Disbursement failed:', error);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'applied':
                return <span className="status-badge applied">Pending Review</span>;
            case 'allocated':
                return <span className="status-badge allocated">Ready for Disbursement</span>;
            case 'disbursed':
                return <span className="status-badge disbursed">Completed</span>;
            default:
                return <span className="status-badge">{status}</span>;
        }
    };

    return (
        <div className="pad-applications-container">
            <div className="applications-header">
                <h2>
                    <i className="fas fa-clipboard-list"></i> Sanitary Pad Applications
                </h2>
                <p className="subtitle">Manage all school applications for sanitary pads</p>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading applications...</p>
                </div>
            ) : requests.length === 0 ? (
                <div className="empty-state">
                    <i className="fas fa-inbox"></i>
                    <p>No applications available at the moment</p>
                </div>
            ) : (
                <div className="applications-list">
                    {requests.map((req) => (
                        <div key={req._id} className="application-card">
                            <div className="application-info">
                                <h3 className="school-name">
                                    <i className="fas fa-school"></i> {req.school.schoolName}
                                </h3>
                                <div className="application-details">
                                    <div className="detail-item">
                                        <span className="detail-label">Requested:</span>
                                        <span className="detail-value">{req.quantityRequested} pads</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="detail-label">Status:</span>
                                        {getStatusBadge(req.status)}
                                    </div>
                                    {req.reason && (
                                        <div className="detail-item">
                                            <span className="detail-label">Reason:</span>
                                            <span className="detail-value">{req.reason}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="application-actions">
                                {req.status === 'applied' && (
                                    <button
                                        className="action-button allocate"
                                        onClick={() => handleAllocate(req._id)}
                                    >
                                        <i className="fas fa-box-open"></i> Allocate
                                    </button>
                                )}
                                {req.status === 'allocated' && (
                                    <button
                                        className="action-button disburse"
                                        onClick={() => handleDisburse(req._id)}
                                    >
                                        <i className="fas fa-truck"></i> Disburse
                                    </button>
                                )}
                                {req.status === 'disbursed' && (
                                    <button className="action-button completed" disabled>
                                        <i className="fas fa-check-circle"></i> Completed
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PadApplications;