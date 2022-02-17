<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li v-if="isLoggedIn" class="nav-item">
        <router-link
          :to="{ name: 'YourFeed' }"
          class="nav-link"
          :class="{ active: routeName === 'YourFeed' }"
        >
          Your feed
        </router-link>
      </li>

      <li class="nav-item">
        <router-link
          :to="{ name: 'GlobalFeed' }"
          class="nav-link"
          :class="{ active: routeName === 'GlobalFeed' }"
        >
          Global feed
        </router-link>
      </li>

      <li v-if="tagName" class="nav-item">
        <router-link
          :to="{ name: 'Tag' }"
          class="nav-link"
          :class="{ active: routeName === 'Tag' }"
        >
          <i class="ion-pound" />
          {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppFeedToggler",
  props: {
    tagName: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn"]),
    routeName() {
      return this.$route.name;
    },
  },
};
</script>
