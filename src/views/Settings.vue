<template>
  <div v-if="currentUser" class="container page">
    <div class="row">
      <h1 class="text-xs-center">Your Settings</h1>
      <div v-if="currentUser" class="col-md-6 offset-md-3 col-xs-12">
        <AppValidationErrors
          v-if="validationErrors"
          :validation-errors="validationErrors"
        />

        <form @submit.prevent="onSubmit">
          <fieldset>
            <fieldset class="form-group">
              <input v-model="form.image" class="form-control" type="text" />
            </fieldset>

            <fieldset class="form-group">
              <input
                v-model="form.username"
                class="form-control"
                type="text"
                placeholder="Username"
              />
            </fieldset>

            <fieldset class="form-group">
              <textarea
                v-model="form.bio"
                class="form-control form-control-lg"
                placeholder="Short bio about you"
                rows="8"
              >
              </textarea>
            </fieldset>

            <fieldset class="form-group">
              <input
                v-model="form.email"
                class="form-control"
                type="email"
                placeholder="Email"
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                v-model="form.password"
                class="form-control"
                type="password"
                placeholder="New Password"
              />
            </fieldset>
            <button
              :disabled="isLoading"
              class="btn btn-lg btn-primary pull-xs-right"
              type="submit"
            >
              Update Settings
            </button>
          </fieldset>
        </form>
        <hr />

        <button @click.prevent="onLogout" class="btn btn-outline-danger">
          Or click here to logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppValidationErrors from "@/components/ValidationErrors.vue";

export default {
  name: "AppSettings",
  components: {
    AppValidationErrors,
  },

  computed: {
    ...mapGetters("auth", ["validationErrors", "currentUser", "isLoading"]),
    form() {
      return {
        image: this.currentUser.image,
        bio: this.currentUser.bio,
        username: this.currentUser.username,
        email: this.currentUser.email,
        password: this.currentUser.password,
      };
    },
  },
  methods: {
    ...mapActions("settings", ["updateCurrenUser"]),
    ...mapActions("auth", ["logout"]),
    onSubmit() {
      this.updateCurrenUser(this.form);
    },
    onLogout() {
      this.logout().then(() => this.$router.push({ name: "GlobalFeed" }));
    },
  },
};
</script>
