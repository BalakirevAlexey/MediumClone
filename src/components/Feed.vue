<template>
  <div>
    <AppLoading v-if="isLoading" />
    <AppErrorMessage :message="error" v-if="error" />
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, idx) in feed.articles"
        :key="idx"
      >
        <div class="article-meta">
          <router-link
            :to="{
              name: 'UserProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" alt="article author" />
          </router-link>

          <div class="info">
            <router-link
              class="author"
              :to="{
                name: 'UserProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>

          <div class="pull-xs-right">
            <AppAddToFavorites
              :is-favorited="article.favorited"
              :article-slug="article.slug"
              :favorites-count="article.favoritesCount"
            />
          </div>
        </div>
        <router-link
          :to="{ name: 'Article', params: { slug: article.slug } }"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <AppTagList v-if="article.tagList" :tag-list="article.tagList" />
        </router-link>
      </div>
      <AppPagination
        :total="feed.articlesCount"
        :limit="limit"
        :currentPage="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { stringify, parseUrl } from "query-string";
import { limit } from "@/helpers/vars";

import AppPagination from "@/components/Pagination";
import AppLoading from "@/components/Loading.vue";
import AppErrorMessage from "@/components/ErrorMessage.vue";
import AppTagList from "@/components/TagList.vue";
import AppAddToFavorites from "@/components/AddToFavorites.vue";

export default {
  name: "AppFeed",
  components: {
    AppPagination,
    AppLoading,
    AppErrorMessage,
    AppTagList,
    AppAddToFavorites,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    limit,
  }),
  computed: {
    ...mapGetters("feed", {
      feed: "data",
      isLoading: "isLoading",
      error: "error",
    }),
    currentPage() {
      return Number(this.$route.query.page || "1");
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * limit - limit;
    },
  },
  methods: {
    ...mapActions("feed", ["getFeed"]),

    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit,
        ofset: 0,
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;

      this.getFeed({ apiUrl: apiUrlWithParams });
    },
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    },
    apiUrl() {
      this.fetchFeed();
    },
  },
  mounted() {
    this.fetchFeed();
  },
};
</script>
