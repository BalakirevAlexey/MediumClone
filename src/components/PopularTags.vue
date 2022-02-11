<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <AppLoading v-if="isLoading" />

    <AppErrorMessage :message="error" v-if="error" />

    <div v-if="tags" class="tag-list">
      <router-link
        :to="{ name: 'Tag', params: { slug: tag } }"
        v-for="tag in tags"
        :key="tag"
        href="#"
        class="tag-default tag-pill"
        >{{ tag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import AppLoading from "@/components/Loading.vue";
import AppErrorMessage from "@/components/ErrorMessage.vue";

export default {
  name: "AppTags",

  components: {
    AppLoading,
    AppErrorMessage,
  },

  computed: {
    ...mapGetters("tags", ["isLoading", "tags", "error"]),
  },

  methods: {
    ...mapActions("tags", ["getTags"]),
  },

  mounted() {
    this.getTags();
  },
};
</script>
<style scoped>
.tag-list {
}

.tag-list a {
  display: inline-block;
}
</style>
