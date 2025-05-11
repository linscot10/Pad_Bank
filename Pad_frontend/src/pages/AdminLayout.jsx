// src/pages/AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';

const AdminLayout = () => {
    return (
        <div className="d-flex">
            <Sidebar />
            

            <div className="flex-grow-1 p-4 bg-light" style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
