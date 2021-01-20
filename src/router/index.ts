import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/estimate"
  },
  {
    path: "/estimate",
    name: "estimate",
    component: () => import("@/views/estimate/estimate.vue")
  },
  {
    path: "/userCenter",
    name: "userCenter",
    component: () => import("@/views/userCenter/userCenter.vue")
  },
  {
    path: "/userTest",
    name: "userTest",
    component: () => import("@/views/userTest/userTest.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
