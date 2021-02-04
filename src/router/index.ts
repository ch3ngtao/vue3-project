import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/estimate"
  },
  {
    path: "/estimate",
    name: "estimate",
    component: () => import("@/views/estimate/estimate.vue"),
    meta: {
      title: '估分系统'
    }
  },
  {
    path: "/userCenter",
    name: "userCenter",
    component: () => import("@/views/userCenter/userCenter.vue"),
    meta: {
      title: '个人中心'
    }
  },
  {
    path: "/userTest",
    name: "userTest",
    component: () => import("@/views/userTest/userTest.vue"),
    meta: {
      title: '估分考试'
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior():any {
    return {x:0, y:0}
  }
});

export default router;
