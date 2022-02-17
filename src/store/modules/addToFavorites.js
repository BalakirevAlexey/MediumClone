import addToFavoritesApi from "@/api/addToFavorites";

export default {
  namespaced: true,
  state: {
    isLoading: false,
  },
  getters: {
    isLoading: ({ isLoading }) => isLoading,
  },
  mutations: {
    addToFavoritesStart(state) {
      state.isLoading = true;
    },
    addToFavoritesEnd(state) {
      state.isLoading = false;
    },
  },

  actions: {
    addToFavorites({ commit }, { slug, isFavorited }) {
      return new Promise((resolve) => {
        commit("addToFavoritesStart");

        const promise = isFavorited
          ? addToFavoritesApi.removeFromFavorites(slug)
          : addToFavoritesApi.addToFavorites(slug);

        promise
          .then((article) => resolve(article))
          .catch((err) => console.log(err))
          .finally(() => commit("addToFavoritesEnd"));
      });
    },
  },
};
