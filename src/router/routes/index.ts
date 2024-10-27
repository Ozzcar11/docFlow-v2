import { type RouteRecordRaw } from "vue-router";

const MainRoute: RouteRecordRaw = {
  path: "/",
  name: "main",
  meta: {
    layout: "empty",
  },
  component: () => import("@/pages/main.vue"),
};

export const allRoutes: RouteRecordRaw[] = [
  MainRoute,
];
