<template>
  <div class="home-page">
    <AppBanner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <AppFeedToggler :tag-name="tagName" />

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
import AppFeed from "@/components/Feed.vue";
import AppPopularTags from "@/components/PopularTags.vue";
import AppBanner from "@/components/Banner.vue";
import AppFeedToggler from "@/components/FeedToggler.vue";

export default {
  name: "AppTagFeed",

  components: { AppFeed, AppPopularTags, AppBanner, AppFeedToggler },

  computed: {
    tagName() {
      return this.$route.params.slug;
    },
    apiUrl() {
      return `/articles?tag=${this.tagName}`;
    },
  },
};
</script>
