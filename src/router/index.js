import Vue from "vue";
import VueRouter from "vue-router";
import GlobalFeed from "../views/GlobalFeed.vue";
import YourFeed from "../views/YourFeed.vue";
import TagFeed from "../views/TagFeed.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Article from "../views/Article.vue";
import CreateArticle from "../views/CreateArticle.vue";
import EditArticle from "../views/EditArticle.vue";
import Settings from "../views/Settings.vue";
import UserProfile from "../views/UserProfile.vue";

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
    component: CreateArticle,
  },
  {
    path: "/articles/:slug",
    name: "Article",
    component: Article,
  },
  {
    path: "/articles/:slug/edit",
    name: "EditArticle",
    component: EditArticle,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/profiles/:slug",
    name: "UserProfile",
    component: UserProfile,
  },
  {
    path: "/profiles/:slug/favorites",
    name: "UserProfileFavorites",
    component: UserProfile,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
