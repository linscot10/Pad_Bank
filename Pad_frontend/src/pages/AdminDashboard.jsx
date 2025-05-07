import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../services/adminService';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getDashboardStats(token);
                setStats(data);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            }
        };
        fetchStats();
    }, [token]);

    if (!stats) return <p className="text-center mt-5">Loading dashboard...</p>;

    return (
        <div className="container my-5">
            <h1 className="text-center mb-5">Admin Dashboard</h1>

            {/* Unique Content Section */}
            <div className="alert alert-info text-center mb-5">
                <h4>Welcome to the Admin Dashboard!</h4>
                <p>
                    Here you can monitor the overall performance of the system,
                    manage school applications, track donations, and view system health stats.
                </p>
                <p>
                    <strong>Tip:</strong> Keep an eye on Pending Requests to ensure quick responses to schools.
                </p>
            </div>

            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="card text-white bg-primary h-100 p-3">
                        <h5>Total Schools</h5>
                        <p className="display-6">{stats.totalSchools}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success h-100 p-3">
                        <h5>Total Sponsors</h5>
                        <p className="display-6">{stats.totalSponsors}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-warning h-100 p-3">
                        <h5>Pending Requests</h5>
                        <p className="display-6">{stats.pendingRequests}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-light h-100 p-3">
                        <h5>Total Received</h5>
                        <p className="display-6">{stats.totalReceived?.length || 0}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-light h-100 p-3">
                        <h5>Total Allocated</h5>
                        <p className="display-6">{stats.totalAllocated?.length || 0}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-light h-100 p-3">
                        <h5>Total Disbursed</h5>
                        <p className="display-6">{stats.totalDisbursed?.length || 0}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
