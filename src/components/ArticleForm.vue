<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <AppValidationErrors v-if="errors" :validation-errors="errors" />
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="title"
                  class="form-control"
                  placeholder="Article Title"
                  type="text"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  v-model="description"
                  class="form-control"
                  placeholder="Description"
                  type="text"
                />
              </fieldset>

              <fieldset class="form-group">
                <textarea
                  v-model="body"
                  class="form-control"
                  placeholder="Write your article (in markdown)"
                  type="text"
                  rows="8"
                >
                </textarea>
              </fieldset>

              <fieldset class="form-group">
                <input
                  @keypress.enter="addTag"
                  class="form-control"
                  placeholder="Enter tags"
                  type="text"
                />
                <div class="tag-list">
                  <span
                    v-for="(tag, i) in initialValues.tagList"
                    :key="i"
                    class="tag-default tag-pill"
                  >
                    <i class="ion-close-round" @click="removeTag(i)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>

              <fieldset>
                <button
                  @click.prevent="onSubmit"
                  :disabled="isSubmitting"
                  type="button"
                  class="btn btn-lg pull-xs-right btn-primary"
                >
                  Publish Article
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppValidationErrors from "@/components/ValidationErrors.vue";

export default {
  name: "AppArticleForm",

  components: {
    AppValidationErrors,
  },
  props: {
    initialValues: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: false,
    },
    isSubmitting: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      title: this.initialValues.title,
      body: this.initialValues.body,
      description: this.initialValues.description,
      tagList: this.initialValues.tagList,
    };
  },
  methods: {
    onSubmit() {
      const form = {
        title: this.title,
        body: this.body,
        description: this.description,
        tagList: this.tagList,
      };
      this.$emit("articleSubmit", form);
    },

    addTag(e) {
      const tag = e.target.value;
      e.target.value = "";
      this.tagList.push(tag);
    },

    removeTag(i) {
      this.tagList.splice(i, 1);
    },
  },
};
</script>
