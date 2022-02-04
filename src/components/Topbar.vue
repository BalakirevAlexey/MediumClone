<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'Home' }">
        MediumClone
      </router-link>

      <ul class="nav navbar-nav menu-wrap">
        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: 'Home' }"
            exact
            active-class="active"
          >
            Home
          </router-link>
        </li>
        <template v-if="!isLoggedIn">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'Register' }"
              active-class="active"
            >
              Sign up
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'Login' }"
              active-class="active"
            >
              Sign in
            </router-link>
          </li>
        </template>

        <template v-else>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'NewArticle' }"
              active-class="active"
            >
              <i class="ion-compose"></i>
              New Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'Settings' }"
              active-class="active"
            >
              <i class="ion-gear-a"></i>
              Settings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{
                name: 'UserProfile',
                params: { slug: currentUser.username },
              }"
              active-class="active"
            >
              <img class="user-pic" :src="currentUser.image" alt="username" />
              {{ currentUser.username }}
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Topbar",

  computed: {
    ...mapGetters("auth", ["isLoggedIn", "currentUser"]),
  },
};
</script>
<style scoped>
.menu-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
