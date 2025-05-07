// src/services/schoolService.js
import api from './api';

export const registerSchool = async (data, token) => {
    const res = await api.post('/schools/register', data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    
    return res.data;
};

export const getSchoolProfile = async (token) => {
    const res = await api.get('/schools/profile', {
        headers: { Authorization: `Bearer ${token}` }
    });
    console.log("data:", res)
    return res.data;
};

export const uploadDocuments = async (formData, token) => {
    const res = await api.post('/schools/upload-docs', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }

    });
    console.log("docs:", res)
    return res.data;
};
