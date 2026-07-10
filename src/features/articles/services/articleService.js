const API_URL = import.meta.env.VITE_API_URL;

export const getAllArticles = async () => {
    const res = await fetch(`${API_URL}/articles`);
    return res.json();
};

export const getArticlesByAuthor = async (authorId) => {
    const res = await fetch(`${API_URL}/articles/author/${authorId}`);
    return res.json();
};

export const getArticlesByStatus = async (status) => {
    const res = await fetch(`${API_URL}/articles/status/${status}`);
    return res.json();
};

export const createArticle = async (article, authorId) => {
    const res = await fetch(`${API_URL}/articles?authorId=${authorId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article)
    });
    return res.json();
};

export const sendToReview = async (id, authorId) => {
    const res = await fetch(`${API_URL}/articles/${id}/send-to-review?authorId=${authorId}`, {
        method: 'PATCH'
    });
    return res.json();
};

export const publishArticle = async (id, managerId) => {
    const res = await fetch(`${API_URL}/articles/${id}/publish?managerId=${managerId}`, {
        method: 'PATCH'
    });
    return res.json();
};

export const deleteArticle = async (id, authorId) => {
    await fetch(`${API_URL}/articles/${id}?authorId=${authorId}`, {
        method: 'DELETE'
    });
};