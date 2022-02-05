<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div col-md-6 offset-md-3 col-xs-12>
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'Login' }"> Have an account?</router-link>
          </p>
          <AppValidationErrors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                v-model="username"
                type="text"
                class="form-control form-control-lg"
                placeholder="Username"
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                v-model="email"
                type="text"
                class="form-control form-control-lg"
                placeholder="Email"
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                v-model="password"
                type="password"
                class="form-control form-control-lg"
                placeholder="Password"
              />
            </fieldset>

            <button
              :disabled="isSubmitting"
              class="btn btn-lg btn-success pull-xs-right"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppValidationErrors from "@/components/ValidationErrors";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Register",
  components: { AppValidationErrors },
  data: () => ({
    username: "",
    email: "",
    password: "",
  }),

  computed: {
    ...mapGetters("auth", ["isSubmitting", "validationErrors"]),
  },
  methods: {
    ...mapActions("auth", ["register"]),
    onSubmit() {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      this.register(user).then(() => this.$router.push({ name: "GlobalFeed" }));
    },
  },
};
</script>
