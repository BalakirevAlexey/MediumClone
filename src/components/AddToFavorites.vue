<template>
  <div class="pull-xs-right">
    <button
      @click="handleLike"
      :class="{
        'btn-outline-primary': isFavoritedOptimistic,
        'btn-primary': !isFavoritedOptimistic,
      }"
      class="btn btn-sm btn-like"
    >
      <i class="ion-heart"> </i>
      <span> &nbsp; {{ favoritesCountOptimistic }}</span>
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AppAddToFavorites",
  props: {
    isFavorited: {
      type: Boolean,
      required: true,
    },
    articleSlug: {
      type: String,
      required: true,
    },
    favoritesCount: {
      type: Number,
      erquared: true,
    },
  },

  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount,
    };
  },

  computed: {
    ...mapGetters("addToFavorites", ["isLoading"]),
  },

  methods: {
    ...mapActions("addToFavorites", ["addToFavorites"]),
    handleLike() {
      this.addToFavorites({
        slug: this.articleSlug,
        isFavorited: this.isFavoritedOptimistic,
      });

      if (this.isFavoritedOptimistic) {
        this.favoritesCountOptimistic -= 1;
      } else {
        this.favoritesCountOptimistic += 1;
      }

      this.isFavoritedOptimistic = !this.isFavoritedOptimistic;
    },
  },
};
</script>

<style scoped>
button.btn-like:focus {
  box-shadow: none;
  outline: none;
  border: 0;
}
</style>
