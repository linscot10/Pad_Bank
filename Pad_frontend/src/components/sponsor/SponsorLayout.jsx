import React from 'react';
import { Outlet } from 'react-router-dom';
import SponsorSidebar from '../sponsor/SponsorSidebar';

const SponsorLayout = () => {
    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            <SponsorSidebar />
            <div className="flex-grow-1 p-4 bg-light">
                <Outlet />
            </div>
        </div>
    );
};

export default SponsorLayout;
