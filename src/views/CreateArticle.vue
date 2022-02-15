<template>
  <AppArticleForm
    :initial-values="initialValues"
    :errors="errors"
    :is-submitting="isSubmitting"
    @articleSubmit="onSubmit"
  />
</template>

<script>
import AppArticleForm from "@/components/ArticleForm";

import { mapGetters, mapActions } from "vuex";
export default {
  name: "AppCreateArticle",

  components: { AppArticleForm },

  data: () => ({
    initialValues: {
      title: "",
      description: "",
      body: "",
      tagList: [],
    },
  }),

  computed: {
    ...mapGetters("createArticle", ["isSubmitting", "errors"]),
  },

  methods: {
    ...mapActions("createArticle", ["createArticle"]),
    onSubmit(data) {
      this.createArticle(data).then((articleRes) => {
        const slug = articleRes.data.article.slug;

        this.$router.push({ name: "Article", params: { slug: slug } });
      });
    },
  },
};
</script>
