import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/view/layouts/MainLayout.vue"),
      children: [
        {
          path: "/users/",
          name: "Users",
          component: () => import("@/view/pages/UsersView.vue"),
        },
        {
          path: "/users/create-user",
          name: "CreateUser",
          component: () => import("@/view/pages/UserLCView.vue"),
        },
        {
          path: "/users/:id",
          name: "CreateUser",
          component: () => import("@/view/pages/UserLCView.vue"),
        },
        {
          path: "/groups/",
          name: "Groups",
          component: () => import("@/view/pages/GroupsView.vue"),
        },
        {
          path: "/groups/:id",
          name: "Group",
          component: () => import("@/view/pages/GroupView.vue"),
        },
      ],
    },
  ],
})

// router.beforeEach((to, from, next) => {
//   if (!useAuthStore().getToken && to.path !== "/login") next("/login")
//   else {
//     next()
//   }
// })

export default router
