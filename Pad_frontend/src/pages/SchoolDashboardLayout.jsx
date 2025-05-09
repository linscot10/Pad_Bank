import React from 'react';
import { Outlet } from 'react-router-dom';
import SchoolSidebar from '../components/school/SchoolSidebar';

const SchoolDashboardLayout = () => {
    return (
        <div className="d-flex">
            <SchoolSidebar />
            <div className="flex-grow-1 p-4 bg-light" style={{ marginLeft: "250px", padding: "20px" }}>
                <Outlet />
            </div>
        </div>
    );
};

export default SchoolDashboardLayout;
