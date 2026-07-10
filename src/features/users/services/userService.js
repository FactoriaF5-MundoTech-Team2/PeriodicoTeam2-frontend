const API_URL = import.meta.env.VITE_API_URL;

export const getUserById = async (id) => {
    const res = await fetch(`${API_URL}/users/${id}`);
    return res.json();
};

export const createUser = async (user) => {
    const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    return res.json();
};

export const deleteUser = async (id) => {
    await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE'
    });
};