import { type RouteRecordRaw } from "vue-router";
import { authRoutes } from "./auth";

const MainRoute: RouteRecordRaw = {
  path: "/",
  name: "main",
  meta: {
    layout: "empty",
  },
  component: () => import("@/pages/main-page.vue"),
};

export const allRoutes: RouteRecordRaw[] = [
  MainRoute,
  ...authRoutes,
];
