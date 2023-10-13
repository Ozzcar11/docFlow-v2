import { createRouter, createWebHistory } from "vue-router"

import { useAuthStore } from "../../stores/auth"

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
      path: "/login",
      name: "Login",
      component: () => import("@/view/pages/LoginView.vue"),
    },
    {
      path: "/user-lc",
      name: "User",
      component: () => import("@/view/pages/UserProjectsView.vue"),
    },
    {
      path: "/user-lc/:id",
      name: "UserProject",
      component: () => import("@/view/pages/UserProjectView.vue"),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  const isAuthorized = Object.prototype.hasOwnProperty.call(localStorage, "accessToken")

  if (isAuthorized || to.path === "/login") next()
  else {
    authStore.logout()
    next("/login")
  }
})

export default router
