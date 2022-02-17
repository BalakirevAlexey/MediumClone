<template>
  <div v-if="userProfile" class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="userProfile.image" alt="" />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div v-if="isCurrentUserProfile">
              <router-link
                :to="{ name: 'Settings' }"
                class="btn btn-sm btn-outline-secondary action-btn"
              >
                <i class="ion-gear-a"></i>
                Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{ active: routerName == 'UserProfile' }"
                  :to="{
                    name: 'UserProfile',
                    params: { slug: userProfile.username },
                  }"
                >
                  My post
                </router-link>
              </li>

              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{ active: routerName == 'UserProfileFavorites' }"
                  :to="{
                    name: 'UserProfileFavorites',
                    params: { slug: userProfile.username },
                  }"
                >
                  Favorites Posts
                </router-link>
              </li>
            </ul>
          </div>
          <AppFeed :api-url="apiUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppFeed from "@/components/Feed";
export default {
  name: "AppUserProfile",

  components: { AppFeed },

  computed: {
    ...mapGetters("userProfile", ["isLoading", "userProfile", "error"]),
    ...mapGetters("auth", ["currentUser"]),

    isCurrentUserProfile() {
      if (!this.currentUser || !this.userProfile) {
        return false;
      }

      return this.currentUser.username === this.userProfile.username;
    },
    userProfileSlug() {
      return this.$route.params.slug;
    },
    apiUrl() {
      const isFavorites = this.$route.path.includes("favorites");

      return isFavorites
        ? `/articles?favorited=${this.userProfileSlug}`
        : `/articles?author=${this.userProfileSlug}`;
    },
    routerName() {
      return this.$route.name;
    },
  },

  methods: {
    ...mapActions("userProfile", ["getUserProfile"]),
  },
  watch: {
    userProfileSlug() {
      this.getUserProfile(this.userProfileSlug);
    },
  },
  mounted() {
    this.getUserProfile(this.userProfileSlug);
  },
};
</script>
