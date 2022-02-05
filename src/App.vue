<template>
  <div id="app">
    <AppTopbar />

    <router-view />
  </div>
</template>

<script>
import AppTopbar from "@/components/Topbar";

import { mapActions } from "vuex";

export default {
  components: { AppTopbar },

  methods: {
    ...mapActions("auth", ["getCurrenUser"]),
  },
  created() {
    this.getCurrenUser();
  },
};
</script>
<style>
body {
  padding: 0;
  margin: 0;
}
</style>
