import authApi from "@/api/auth.js";

export default {
  namespaced: true,

  actions: {
    updateCurrenUser({ commit }, updateUser) {
      return new Promise((resolve) => {
        commit("auth/getCurrentUserStart", null, { root: true });

        authApi
          .updateCurrentUser(updateUser)
          .then((res) => {
            const user = res.data.user;

            commit("auth/getCurrentUserSuccess", user, { root: true });
            resolve(user);
          })
          .catch((err) => {
            const errors = err.response.data.errors;
            commit("auth/getCurrentUserFailure", errors, { root: true });
          });
      });
    },
  },
};
