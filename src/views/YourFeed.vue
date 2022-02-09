<template>
  <div class="home-page">
    <AppBanner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <AppFeedToggler />

          <AppFeed :api-url="apiUrl" />
        </div>

        <div class="col-md-3">
          <AppTags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFeed from "@/components/Feed.vue";
import AppTags from "@/components/Tags.vue";
import AppBanner from "@/components/Banner.vue";
import AppFeedToggler from "@/components/FeedToggler.vue";

export default {
  name: "AppYourFeed",

  components: { AppFeed, AppTags, AppBanner, AppFeedToggler },

  data: () => ({
    apiUrl: "/articles/feed",
  }),
};
</script>
