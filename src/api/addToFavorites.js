import axios from "@/api/axios";

const addToFavorites = (slug) => {
  return axios.post(`/articles/${slug}/favorite`);
};

const removeFromFavorites = (slug) => {
  return axios.delete(`/articles/${slug}/favorite`);
};

export default {
  addToFavorites,
  removeFromFavorites,
};
