<script setup lang="ts">
import { ConfigAPI } from "@/api/config"
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const menu = ref([
  {
    lable: "Все",
  },
])

const data = ref([])

async function getUserData() {
  const { data } = await ConfigAPI.getNode(route.params.id)
  data.value = data.fields
  console.log(data.value)
}

onMounted(() => {
  getUserData()
})
</script>

<template>
  <el-container class="container">
    <el-aside width="280px" class="p-4 font-medium bg-white">
      <div class="mb-1">Просмотр этапов</div>
      <div class="">
        <div class="menu">
          <div class="menu__item" v-for="(item, index) in menu" :key="index">{{ item.lable }}</div>
        </div>
      </div>
    </el-aside>
    <el-main class="main px-10">
      <div class="text-3xl font-medium">Все этапы</div>
      <div class=""></div>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.container {
  @apply h-screen;
  max-width: 100vw;
  background-color: #f5f5f5;
}
.menu {
  @apply grid grid-cols-2 gap-2;
  &__item {
    @apply flex items-center justify-center p-11 rounded-xl cursor-pointer;
    background-color: #f5f5f5;
  }
}

.main {
  @apply bg-white mx-auto;
  max-width: 650px;
}
</style>
