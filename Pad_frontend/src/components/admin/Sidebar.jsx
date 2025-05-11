import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const linkStyle = ({ isActive }) =>
        `nav-link py-3 px-4 rounded ${isActive ? 'bg-light text-dark fw-bold' : 'text-white'}`;

    return (
        <div
            className="bg-dark text-white p-3"
            style={{
                width: '250px',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                overflowY: 'auto',
            }}
        >
            <h4 className="mb-4" style={{ color: 'crimson' }}><strong>Pad Bank</strong></h4>
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
