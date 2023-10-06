<script setup lang="ts">
import { RouterView } from "vue-router"
</script>

<template>
  <el-container class="h-screen">
    <el-aside class="aside" width="340px">
      <div class="text-3xl font-medium mx-5 my-8">К.О.</div>
      <el-menu :router="true" default-active="1" class="border-none">
        <el-menu-item index="1" route="/">
          <span>Объекты</span>
        </el-menu-item>
        <el-menu-item index="2" route="/users/">
          <span>Пользователи</span>
        </el-menu-item>
        <el-menu-item index="3" route="/groups/">
          <span>Отделы</span>
        </el-menu-item>
      </el-menu>
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
</style>
