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

   
    return res.data || { status: 'Not Applied', quantityRequested: 0, allocatedPads: 0 };

};
