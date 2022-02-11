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
          <AppPopularTags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppPopularTags from "@/components/PopularTags.vue";
import AppBanner from "@/components/Banner.vue";
import AppFeed from "@/components/Feed.vue";
import AppFeedToggler from "@/components/FeedToggler.vue";

export default {
  name: "AppYourFeed",

  components: { AppFeed, AppPopularTags, AppBanner, AppFeedToggler },

  data: () => ({
    apiUrl: "/articles/feed",
  }),
};
</script>
