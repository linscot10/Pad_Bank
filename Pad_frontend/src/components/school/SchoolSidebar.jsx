import React from 'react';
import { NavLink } from 'react-router-dom';


const SchoolSidebar = () => {
    return (
        <div className="sidebar">
            <h4 className="mb-4 " style={{ color: "crimson" }}><strong>Pad Bank</strong></h4>
            <ul className="nav flex-column">
                <li className="nav-item mb-2">
                    <NavLink
                        to="home"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        Profile 
                    </NavLink>
                </li>
                <li className="nav-item mb-2">
                    <NavLink
                        to="apply"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        Pad Application
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default SchoolSidebar;
