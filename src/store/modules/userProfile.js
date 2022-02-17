import userProfileApi from "@/api/userProfile";

export default {
  namespaced: true,

  state: {
    data: null,
    isLoading: false,
    error: null,
  },

  getters: {
    userProfile: ({ data }) => data,
    isLoading: (state) => state.isLoading,
    error: ({ error }) => error,
  },

  mutations: {
    getUserProfileStart(state) {
      state.isLoading = true;
      state.data = null;
    },
    getUserProfileSuccess(state, userProfile) {
      state.data = userProfile;
      state.isLoading = false;
    },
    getUserProfileFailure(state, errors) {
      state.isLoading = false;
      console.log(errors);
    },
  },

  actions: {
    getUserProfile({ commit }, slug) {
      return new Promise((resolve) => {
        commit("getUserProfileStart");

        userProfileApi
          .getUserProfile(slug)
          .then((res) => {
            commit("getUserProfileSuccess", res.data.profile);
            // console.log(res.data.profile);
            resolve(res.data.profile);
          })
          .catch((err) => {
            const errors = err.response.data.errors;

            commit("getUserProfileFailure", errors);
            console.log(errors);
          });
      });
    },
  },
};
