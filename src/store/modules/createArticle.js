import articleApi from "@/api/article";

export default {
  namespaced: true,
  state: {
    isSubmitting: false,
    errors: null,
  },
  getters: {
    isSubmitting: ({ isSubmitting }) => isSubmitting,
    errors: ({ errors }) => errors,
  },
  mutations: {
    createArticleStart(state) {
      state.isSubmitting = true;
      state.errors = null;
    },
    createArticleSuccess(state) {
      state.isSubmitting = false;
    },
    createArticleFailure(state, errors) {
      state.isSubmitting = false;
      state.errors = errors;
    },
  },
  actions: {
    createArticle({ commit }, article) {
      return new Promise((resolve) => {
        commit("createArticleStart");

        articleApi
          .createArticle(article)
          .then((article) => {
            commit("createArticleSuccess", article);

            resolve(article);
          })
          .catch((err) => {
            commit("createArticleFailure", err.response.data.errors);
          });
      });
    },
  },
};
