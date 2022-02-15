<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link
            :to="{
              name: 'UserProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" alt="author" />
          </router-link>

          <div class="info">
            <router-link
              :to="{
                name: 'UserProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{
                name: 'EditArticle',
                params: { slug: article.slug },
              }"
            >
              <i class="ion-edit" />
              Adit Article
            </router-link>
            <button class="btn btn-danger btn-sm" @click="onDeleteArticle">
              <i class="ion-trash-a"> Delete Article</i>
            </button>
          </span>
        </div>
      </div>
    </div>

    <div class="container page">
      <AppLoading v-if="isLoading" />
      <AppErrorMessage v-if="error" :message="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>

          <AppTagList v-if="article.tagList" :tag-list="article.tagList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppLoading from "@/components/Loading.vue";
import AppErrorMessage from "@/components/ErrorMessage.vue";
import AppTagList from "@/components/TagList.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "AppArticle",

  components: { AppLoading, AppErrorMessage, AppTagList },

  computed: {
    ...mapGetters("article", {
      article: "data",
      isLoading: "isLoading",
      error: "error",
    }),
    ...mapGetters("auth", ["currentUser"]),
    isAuthor() {
      if (!this.article || !this.currentUser) {
        return false;
      }
      return this.article.author.username === this.currentUser.username;
    },
  },
  methods: {
    ...mapActions("article", ["getArticle", "deleteArticle"]),
    onDeleteArticle() {
      this.deleteArticle(this.$route.params.slug).then(() =>
        this.$router.push({ name: "GlobalFeed" })
      );
    },
  },

  mounted() {
    this.getArticle(this.$route.params.slug);
  },
};
</script>
