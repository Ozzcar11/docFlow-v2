<script setup lang="ts">
import { RouterView } from "vue-router"
import BackIcon from "@/assets/icons/BackIcon.vue"

import router from "../router"

import { useRoute } from "vue-router"

const route = useRoute()

const menuItems = [
  {
    lable: "Объекты",
    path: "/",
  },
  {
    lable: "Пользователи",
    path: "/users/",
  },
  {
    lable: "Отделы",
    path: "/groups/",
  },
]

const logout = () => {
  router.push("/login")
  localStorage.removeItem("isAdmin")
}
</script>

<template>
  <el-container class="h-screen">
    <el-aside class="aside" width="340px">
      <div class="text-3xl font-medium mx-5 my-8">К.О.</div>
      <el-menu :router="true" :default-active="route.path" class="border-none">
        <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path" :route="item.path">
          <span>{{ item.lable }}</span>
        </el-menu-item>
      </el-menu>
      <div class="absolute bottom-0 p-8">
        <el-button type="primary" class="main-btn" @click="logout">
          <BackIcon class="w-6 h-6 mr-2" />
          Выйти
        </el-button>
      </div>
    </el-aside>
    <el-container direction="vertical">
      <RouterView />
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.aside {
  border-right: 1px solid #ccc;
}

.main-btn {
  @apply font-medium text-black bg-white border-gray-300 hover:bg-white hover:text-black px-4 py-2.5 rounded-xl h-10;
}
</style>
