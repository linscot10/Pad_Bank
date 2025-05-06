import api from './api'; // make sure this path is correct

export const createSponsorProfile = async (data) => {
    const res = await api.post('/sponsors/create-profile', data);
    return res.data;
};

export const donatePads = async (data) => {
    const res = await api.post('/sponsors/donate', data);
    return res.data;
};

export const getMyDonations = async () => {
    const res = await api.get('/sponsors/donations');
    return res.data;
};

export const getSponsorProfile = async () => {
    const res = await api.get('/sponsors/profile');
    return res.data;
};