import tagsApi from "@/api/tags";

export default {
  namespaced: true,

  state: {
    data: null,
    isLoading: false,
    error: null,
  },

  getters: {
    tags: ({ data }) => data,
    isLoading: (state) => state.isLoading,
    error: ({ error }) => error,
  },

  mutations: {
    getTagsStart(state) {
      state.isLoading = true;
      state.data = null;
    },
    getTagsSuccess(state, tags) {
      state.isLoading = false;
      state.data = tags;
    },
    getTagsFailure(state, errors) {
      state.isLoading = false;
      console.log(errors);
    },
  },

  actions: {
    getTags({ commit }) {
      return new Promise((resolve) => {
        commit("getTagsStart");

        tagsApi
          .getTags()
          .then((res) => {
            commit("getTagsSuccess", res.data.tags);

            resolve(res.data.tags);
          })
          .catch((err) => {
            const errors = err.response.data.errors;

            commit("getTagsFailure", errors);
            console.log(errors);
          });
      });
    },
  },
};
