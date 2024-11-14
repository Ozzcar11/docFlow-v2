import { type RouteRecordRaw } from "vue-router";

const loginRoute: RouteRecordRaw = {
  path: "/login",
  name: "login-route",
  meta: {
    layout: "empty",
  },
  component: () => import("@/pages/auth/login-page.vue"),
};

export const authRoutes: RouteRecordRaw[] = [loginRoute];