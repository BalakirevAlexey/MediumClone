import authApi from "@/api/auth.js";
import { setItem } from "@/helpers/persistenceStorage";

export default {
  namespaced: true,
  state: {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
  },
  getters: {
    isSubmitting: ({ isSubmitting }) => isSubmitting,
    currentUser: ({ currentUser }) => currentUser,
    validationErrors: ({ validationErrors }) => validationErrors,
    isLoggedIn: ({ isLoggedIn }) => isLoggedIn,
  },
  mutations: {
    registerStart(state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    registerSuccess(state, user) {
      state.isSubmitting = false;
      state.currentUser = user;
      state.isLoggedIn = true;
    },
    registerFailure(state, errors) {
      state.isSubmitting = false;
      state.validationErrors = errors;
    },

    loginStart(state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    loginSuccess(state, user) {
      state.isSubmitting = false;
      state.currentUser = user;
      state.isLoggedIn = true;
    },
    loginFailure(state, errors) {
      state.isSubmitting = false;
      state.validationErrors = errors;
    },
  },
  actions: {
    register({ commit }, credentials) {
      return new Promise((resolve) => {
        commit("registerStart");

        authApi
          .register(credentials)
          .then((res) => {
            const user = res.data.user;

            commit("registerSuccess", user);
            setItem("accessToken", user.token);
            resolve(user);
          })
          .catch((err) => {
            const errors = err.response.data.errors;

            commit("registerFailure", errors);
          });
      });
    },

    login({ commit }, credentials) {
      return new Promise((resolve) => {
        commit("loginStart");

        authApi
          .login(credentials)
          .then((res) => {
            const user = res.data.user;

            commit("loginSuccess", user);
            setItem("accessToken", user.token);
            resolve(user);
          })
          .catch((err) => {
            const errors = err.response.data.errors;

            commit("loginFailure", errors);
          });
      });
    },
  },
};
