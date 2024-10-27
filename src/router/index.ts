import {
  type RouteRecordRaw,
  createRouter,
  createWebHistory,
} from "vue-router";

import { allRoutes } from "./routes";

export const routes: RouteRecordRaw[] = [
  ...allRoutes,
  {
    path: "/404",
    name: "404",
    meta: {
      title: "Страница не найдена",
      layout: "default",
    },
    component: () => import("@/pages/404.vue"),
  },
  { path: "/:pathMatch(.*)*", redirect: "/404" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
