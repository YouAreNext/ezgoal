import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Index from "../pages/index.vue";
import Login from "../pages/login.vue";
import Register from "../pages/register.vue";

const authGuard = (to: any, from: any, next: any) => {
  const token = localStorage.getItem("AUTH_TOKEN");

  if (token || token != null) {
    next();
  } else {
    next("/login");
  }
};

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    beforeEnter: authGuard
  },
  {
    path: "/login",
    name: "Login",
    meta: { unauth: true, layout: "auth" },
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    meta: { unauth: true, layout: "auth" },
    component: Register
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
