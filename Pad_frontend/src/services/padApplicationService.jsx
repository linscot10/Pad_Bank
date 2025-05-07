// src/services/padApplicationService.js
import api from './api';

export const applyForPads = async (data, token) => {
    const res = await api.post('/applications/apply', data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    console.log("apply", res);

    return res.data;
};

export const getApplicationStatus = async (token) => {
    const res = await api.get('/applications/status', {
        headers: { Authorization: `Bearer ${token}` }
    });

    console.log("status:", res)
    return res.data;
};
