import authApi from "@/api/auth.js";
import { setItem } from "@/helpers/persistanceStorage";

export default {
  namespaced: true,
  state: {
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null,
  },
  getters: {
    isSubmitting: ({ isSubmitting }) => isSubmitting,
    currentUser: ({ currentUser }) => currentUser,
    validationErrors: ({ validationErrors }) => validationErrors,
    isLoggedIn: ({ isLoggedIn }) => Boolean(isLoggedIn),
    isLoading: ({ isLoading }) => isLoading,
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

    getCurrentUserStart(state) {
      state.isLoading = true;
    },
    getCurrentUserSuccess(state, user) {
      state.currentUser = user;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    getCurrentUserFailure(state) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.currentUser = null;
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

    getCurrenUser({ commit }) {
      return new Promise((resolve) => {
        commit("getCurrentUserStart");

        authApi
          .getCurrentUser()
          .then((res) => {
            const user = res.data.user;

            commit("getCurrentUserSuccess", user);
            resolve(user);
          })
          .catch(() => {
            commit("loginFailure");
          });
      });
    },
  },
};
