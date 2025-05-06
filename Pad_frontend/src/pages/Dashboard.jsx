import React from 'react'

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="container mt-4">
            <h3>Welcome, {user?.name}</h3>
            <p>Your role: <strong>{user?.role}</strong></p>
        </div>
    );
}

export default Dashboard