import Vue from "vue";
import VueRouter from "vue-router";
import GlobalFeed from "../views/GlobalFeed.vue";
import YourFeed from "../views/YourFeed.vue";
import TagFeed from "../views/TagFeed.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "GlobalFeed",
    component: GlobalFeed,
  },
  {
    path: "/feed",
    name: "YourFeed",
    component: YourFeed,
  },
  {
    path: "/tags/:slug",
    name: "Tag",
    component: TagFeed,
  },
  {
    path: "/articles/new",
    name: "CreateArticle",
    component: GlobalFeed,
  },
  {
    path: "/articles/:slug",
    name: "Article",
    component: GlobalFeed,
  },
  {
    path: "/settings",
    name: "Settings",
    component: GlobalFeed,
  },
  {
    path: "/profiles/:slug",
    name: "UserProfile",
    component: GlobalFeed,
  },
  {
    path: "/profiles/:slug/favortes",
    name: "UserProfileFavorites",
    component: GlobalFeed,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
