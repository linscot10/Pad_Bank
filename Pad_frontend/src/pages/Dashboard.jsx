import React from 'react'

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="container mt-4">
            <div className="welcome-card p-4 bg-white rounded shadow-sm">
                <h3 className="text-center mb-3">Welcome, {user?.name}</h3>
                <p className="text-center">
                    Your role: <strong>{user?.role}</strong>
                </p>
            </div>
        </div>
    );
}

export default Dashboard