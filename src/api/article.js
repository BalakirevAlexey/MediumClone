import axios from "@/api/axios";

const getArticle = (slug) => {
  return axios.get(`/articles/${slug}`);
};

const deleteArticle = (slug) => {
  return axios.delete(`/articles/${slug}`);
};

const createArticle = (formData) => {
  return axios.post("/articles", { article: formData });
};

const updateArticle = (slug, formData) => {
  return axios.put(`/articles/${slug}`, { article: formData });
};

export default {
  getArticle,
  deleteArticle,
  createArticle,
  updateArticle,
};
