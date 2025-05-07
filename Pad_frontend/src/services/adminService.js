// src/services/adminService.js
import api from './api';

// Get dashboard statistics
export const getDashboardStats = async (token) => {
    const res = await api.get('/admin/', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

// Get all pad applications
export const getAllRequests = async (token) => {
    const res = await api.get('/admin/requests', {
        headers: { Authorization: `Bearer ${token}` }
    });
    // console.log(res)
    return res.data;
};

// Allocate pads to an application
export const allocatePads = async (applicationId, token) => {
    const adminUserId = localStorage.getItem('userId');
    const res = await api.post(`/admin/allocate/${applicationId}`, {
        applicationId,
        userId: adminUserId
    }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

// Disburse pads to an application
export const disbursePads = async (applicationId, token) => {
    const adminUserId = localStorage.getItem('userId');
    const res = await api.post(`/admin/${applicationId}/disburse`, {
        applicationId,
        userId: adminUserId
    }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

// Get all donations
export const getAllDonations = async (token) => {
    const res = await api.get('/admin/donations', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

// Get inventory details
export const getInventory = async (token) => {
    const res = await api.get('/admin/inventory', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

// Add pads to inventory
export const addPads = async (data, token) => {
    const res = await api.post('/admin/add-stock', data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};
