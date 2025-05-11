import React from 'react';
import { NavLink } from 'react-router-dom';


const SponsorSidebar = () => {
    return (
        <div className="bg-dark text-white p-3" style={{ width: '250px', minHeight: '100vh' }}>
            <h4 className="text-center mb-4">Sponsor Panel</h4>
            <ul className="nav flex-column">
                <li className="nav-item mb-2">
                    <NavLink to="/sponsor/profile" className="nav-link text-white" activeclassname="active">Profile</NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink to="/sponsor/donate" className="nav-link text-white" activeclassname="active">Donate</NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink to="/sponsor/history" className="nav-link text-white" activeclassname="active">History</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default SponsorSidebar;
