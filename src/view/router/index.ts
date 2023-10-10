import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("@/view/layouts/MainLayout.vue"),
      children: [
        {
          path: "/",
          name: "Objects",
          component: () => import("@/view/pages/ObjectsView.vue"),
        },
        {
          path: "/users",
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
          path: "/groups",
          name: "Groups",
          component: () => import("@/view/pages/GroupsView.vue"),
        },
        {
          path: "/groups/:id",
          name: "Group",
          component: () => import("@/view/pages/GroupView.vue"),
        },
        {
          path: "/groups/create-group",
          name: "CreateGroup",
          component: () => import("@/view/pages/CreateGroupView.vue"),
        },
      ],
    },
    {
      path: "/project/:id",
      name: "Object",
      component: () => import("@/view/pages/ObjectView.vue"),
    },
    {
      path: "/newConfig",
      name: "CreateNewObject",
      component: () => import("@/view/pages/ObjectView.vue"),
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
