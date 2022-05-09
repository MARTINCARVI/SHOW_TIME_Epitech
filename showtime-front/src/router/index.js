import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import AdminView from "../views/AdminView.vue";
import ProfileView from "../views/ProfileView.vue";
// import SignupModal from "../components/SignupModal.vue";

// import store from "src/store/index.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  // {
  //     path: ":Sign-up",
  //     name: "Sign-up",
  //     component: SignupModal.vue,
  // },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/auth",
    name: "admin",
    component: AdminView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// router.beforeEach((to, from, next) => {
//   const ok = store.getters.getIsLogged;
//   const requiresAuth = null;

//   if (requiresAuth && !ok) next("login");
//   else next();
// });
export default router;
