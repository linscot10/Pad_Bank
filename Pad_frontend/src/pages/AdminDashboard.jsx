import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../services/adminService';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await getDashboardStats(token);
                setStats(data);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [token]);

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner"></div>
                <p>Loading dashboard data...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            {/* Dashboard Header */}
            <div className="dashboard-header">
                <h1>
                    <i className="fas fa-tachometer-alt"></i> Admin Dashboard
                </h1>
                <p className="subtitle">Overview of system performance and metrics</p>
            </div>

            {/* Welcome Panel */}
            <div className="welcome-panel">
                <div className="welcome-content">
                    <h3>
                        <i className="fas fa-info-circle"></i> Welcome to the Admin Dashboard
                    </h3>
                    <p>
                        Monitor system performance, manage school applications, track donations,
                        and view key metrics to ensure smooth operation of the sanitary pad
                        distribution program.
                    </p>
                    <div className="tip-box">
                        <i className="fas fa-lightbulb"></i>
                        <span>
                            <strong>Pro Tip:</strong> Check Pending Requests regularly to ensure
                            timely responses to schools in need.
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {/* Row 1 */}
                <div className="stat-card primary">
                    <div className="stat-icon">
                        <i className="fas fa-school"></i>
                    </div>
                    <div className="stat-content">
                        <h3>Total Schools</h3>
                        <p className="stat-value">{stats.totalSchools}</p>
                    </div>
                </div>

                <div className="stat-card success">
                    <div className="stat-icon">
                        <i className="fas fa-hand-holding-heart"></i>
                    </div>
                    <div className="stat-content">
                        <h3>Total Sponsors</h3>
                        <p className="stat-value">{stats.totalSponsors}</p>
                    </div>
                </div>

                <div className="stat-card warning">
                    <div className="stat-icon">
                        <i className="fas fa-clock"></i>
                    </div>
                    <div className="stat-content">
                        <h3>Pending Requests</h3>
                        <p className="stat-value">{stats.pendingRequests}</p>
                    </div>
                </div>

                {/* Row 2 */}
                <div className="stat-card light">
                    <div className="stat-icon">
                        <i className="fas fa-box-open"></i>
                    </div>
                    <div className="stat-content">
                        <h3>Pads Received</h3>
                        <p className="stat-value">{stats.totalReceived?.length || 0}</p>
                    </div>
                </div>

                <div className="stat-card light">
                    <div className="stat-icon">
                        <i className="fas fa-tasks"></i>
                    </div>
                    <div className="stat-content">
                        <h3>Pads Allocated</h3>
                        <p className="stat-value">{stats.totalAllocated?.length || 0}</p>
                    </div>
                </div>

                <div className="stat-card light">
                    <div className="stat-icon">
                        <i className="fas fa-truck"></i>
                    </div>
                    <div className="stat-content">
                        <h3>Pads Disbursed</h3>
                        <p className="stat-value">{stats.totalDisbursed?.length || 0}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;