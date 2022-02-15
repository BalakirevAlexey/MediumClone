import articleApi from "@/api/article";

export default {
  namespaced: true,
  state: {
    isSubmitting: false,
    errors: null,
    isLoading: false,
    article: null,
  },
  getters: {
    isSubmitting: ({ isSubmitting }) => isSubmitting,
    errors: ({ errors }) => errors,
    article: ({ article }) => article,
    isLoading: ({ isLoading }) => isLoading,
  },
  mutations: {
    updateArticleStart(state) {
      state.isSubmitting = true;
      state.errors = null;
    },
    updateArticleSuccess(state) {
      state.isSubmitting = false;
    },
    updateArticleFailure(state, errors) {
      state.isSubmitting = false;
      state.errors = errors;
    },

    getArticleStart(state) {
      state.isLoading = true;
      state.article = null;
      state.errors = null;
    },
    getArticleSuccess(state, article) {
      state.isLoading = false;
      state.article = article;
    },
    getArticleFailure(state, errors) {
      state.isLoading = false;
      state.errors = errors;
    },
  },
  actions: {
    updateArticle({ commit }, { slug, article }) {
      return new Promise((resolve) => {
        commit("updateArticleStart");

        articleApi
          .updateArticle(slug, article)
          .then((article) => {
            commit("updateArticleSuccess", article);

            resolve(article);
          })
          .catch((err) => {
            commit("updateArticleFailure", err.response.data.errors);
          });
      });
    },

    getUpdatedArticle({ commit }, slug) {
      return new Promise((resolve) => {
        commit("getArticleStart");

        articleApi
          .getArticle(slug)
          .then((article) => {
            commit("getArticleSuccess", article.data.article);
            console.log(article.data.article);
            resolve(article);
          })
          .catch((err) => {
            commit("getArticleFailure", err.response.data.errors);
          });
      });
    },
  },
};
