// src/components/admin/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const linkStyle = ({ isActive }) =>
        `nav-link py-3 px-4 rounded ${isActive ? 'bg-light text-dark fw-bold' : 'text-white'
        }`;

    return (
        <div className="bg-dark text-white vh-100 p-3" style={{ width: '250px' }}>
            <h4 className="text-center mb-4">Admin Panel</h4>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <NavLink to="/admin" end className={linkStyle}>Dashboard</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin/inventory" className={linkStyle}>Inventory</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin/applications" className={linkStyle}>Pad Applications</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin/donations" className={linkStyle}>Donations</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
