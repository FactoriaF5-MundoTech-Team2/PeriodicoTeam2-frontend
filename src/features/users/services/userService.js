import api from '../../../api';

export const getUserById = async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
};

export const createUser = async (userData, rolesIds) => {
    const res = await api.post(`/users?rolesIds=${rolesIds.join(',')}`, userData)
    return res.data
};

export const deleteUser = async (id, requestingUserId) => {
    await api.delete(`/users/${id}?requestingUserId=${requestingUserId}`);
};

export const loginUser = async (credentials) => {
    const res = await api.post('/users/login', credentials)
    return res.data
}