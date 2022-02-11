import articleApi from "@/api/article";

export default {
  namespaced: true,

  state: {
    data: null,
    isLoading: false,
    error: null,
  },

  getters: {
    data: ({ data }) => data,
    isLoading: (state) => state.isLoading,
    error: ({ error }) => error,
  },

  mutations: {
    GET_ARTICLE_START(state) {
      state.isLoading = true;
      state.data = null;
    },
    GET_ARTICLE_SUCCESS(state, article) {
      state.isLoading = false;
      state.data = article;
    },
    GET_ARTICLE_FAILURE(state, errors) {
      state.isLoading = false;
      console.log(errors);
    },

    DELETE_ARTICLE() {},
  },

  actions: {
    getArticle({ commit }, slug) {
      return new Promise((resolve) => {
        commit("GET_ARTICLE_START");

        articleApi
          .getArticle(slug)
          .then((res) => {
            const article = res.data.article;
            commit("GET_ARTICLE_SUCCESS", article);

            resolve(article);
          })
          .catch((err) => {
            const errors = err.response.data.errors;

            commit("GET_ARTICLE_FAILURE", errors);
            console.log(errors);
          });
      });
    },

    deleteArticle({ commit }, slug) {
      return new Promise((resolve) => {
        articleApi
          .deleteArticle(slug)
          .then(() => {
            commit("DELETE_ARTICLE");
            resolve();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
  },
};
