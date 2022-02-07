import feedApi from "@/api/feed";

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
    getFeedStart(state) {
      state.isLoading = true;
      state.data = null;
    },
    getFeedSuccess(state, articles) {
      state.isLoading = false;
      state.data = articles;
    },
    getFeedFailure(state, errors) {
      state.isLoading = false;
      console.log(errors);
    },
  },

  actions: {
    getFeed({ commit }, { apiUrl }) {
      return new Promise((resolve) => {
        commit("getFeedStart");

        feedApi
          .getFeed(apiUrl)
          .then((res) => {
            commit("getFeedSuccess", res.data);

            resolve(res.data);
          })
          .catch((err) => {
            const errors = err.response.data.errors;

            commit("getFeedFailure", errors);
            console.log(errors);
          });
      });
    },
  },
};
