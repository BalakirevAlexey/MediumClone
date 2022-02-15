<template>
  <div class="container">
    <AppLoading v-if="isLoading" />
    <AppArticleForm
      v-if="article"
      :initial-values="article"
      :errors="errors"
      :is-submitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import AppLoading from "@/components/Loading.vue";
import AppArticleForm from "@/components/ArticleForm";

import { mapGetters, mapActions } from "vuex";
export default {
  name: "AppCreateArticle",

  components: { AppArticleForm, AppLoading },

  computed: {
    ...mapGetters("editArticle", [
      "isSubmitting",
      "isLoading",
      "article",
      "errors",
    ]),
  },
  methods: {
    ...mapActions("editArticle", ["updateArticle", "getUpdatedArticle"]),

    onSubmit(article) {
      const slug = this.$route.params.slug;
      this.updateArticle({ slug, article }).then((articleRes) => {
        const updatedSlug = articleRes.data.article.slug;

        this.$router.push({ name: "Article", params: { slug: updatedSlug } });
      });
    },
  },

  mounted() {
    this.getUpdatedArticle(this.$route.params.slug);
  },
};
</script>
