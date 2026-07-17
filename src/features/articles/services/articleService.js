import api from "../../../api";

export const getAllArticles = async () => {
  const res = await api.get("/articles");
  return res.data;
};

export const getArticlesByAuthor = async (authorId) => {
  const res = await api.get(`/articles/author/${authorId}`);
  return res.data;
};

export const getArticlesByStatus = async (status) => {
  const res = await api.get(`/articles/status/${status}`);
  return res.data;
};

export const getMyArticles = async (authorId, status) => {
  const res = await api.get(
    `/articles/my-articles?authorId=${authorId}&status=${status}`,
  );
  return res.data;
};

export const getArticleById = async (id) => {
  const res = await api.get(`/articles/${id}`);
  return res.data;
};

export const createArticle = async (articleData) => {
  const res = await api.post("/articles", articleData);
  return res.data;
};

export const updateArticle = async (id, articleData, authorId) => {
  const res = await api.put(
    `/articles/${id}?authorId=${authorId}`,
    articleData,
  );
  return res.data;
};

export const submitForReview = async (id, authorId) => {
  const res = await api.patch(
    `/articles/${id}/submit-review?authorId=${authorId}`,
  );
  return res.data;
};

export const approveArticle = async (id, managerId) => {
  const res = await api.patch(`/articles/${id}/approve?managerId=${managerId}`);
  return res.data;
};

export const rejectArticle = async (id, managerId) => {
  const res = await api.patch(`/articles/${id}/reject?managerId=${managerId}`);
  return res.data;
};

export const deleteArticle = async (id, authorId) => {
  await api.delete(`/articles/${id}?authorId=${authorId}`);
};

export const uploadImage = async (articleId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post(`/images/${articleId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
