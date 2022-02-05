<template>
  <h1>{{ apiUrl }}</h1>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Feed",
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions("feed", ["getFeed"]),
  },
  computed: {
    url() {
      return this.apiUrl;
    },
  },
  mounted() {
    this.getFeed(this.apiUrl);
  },
};
</script>
