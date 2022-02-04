<template>
  <div id="app">
    <AppTopbar />
    <router-view />
  </div>
</template>

<script>
import AppTopbar from "@/components/Topbar";
export default {
  components: { AppTopbar },
};
</script>
<style>
body {
  padding: 0;
  margin: 0;
}
</style>
