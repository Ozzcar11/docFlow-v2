<script setup lang="ts">
import { ConfigAPI } from "@/api/config"
import { UsersAPI } from "@/api/users"
import BaseUser from "@/components/Base/BaseUser.vue"
import { configComponents } from "@/utils/config-components"
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import router from "../router"

import BackIcon from "@/assets/icons/BackIcon.vue"

const route = useRoute()

const menu = ref([
  {
    label: "Все",
  },
])

const userData = ref([])

const name = ref("")

const otherData = ref([])

async function getUserData() {
  const { data } = await ConfigAPI.getNode(route.params.id)
  name.value = data.name

  data.fields.forEach((item) => {
    const data = JSON.parse(item.data)
    userData.value.push({
      ...item,
      ...data,
    })
  })
  return data.project_id
}

async function getOthersData(id) {
  otherData.value = []
  const { data } = await ConfigAPI.getOthersData(id)
  Object.entries(data).forEach((item) => {
    item[1].fields.forEach((item) => {
      const data = JSON.parse(item.data)
      otherData.value.push({
        ...item,
        ...data,
      })
    })
  })
}

async function done() {
  const res = userData.value.map((item) => {
    return {
      ...item,
      data: JSON.stringify({
        label: item.label,
        data: item.data,
      }),
    }
  })

  try {
    await UsersAPI.toNextUser(route.params.id)
    await ConfigAPI.changeNode(route.params.id, {
      name: name.value,
      fields: res,
    })
    router.push("/user-lc/")
  } catch (e) {
    router.push("/user-lc/")
  }
}

onMounted(async () => {
  const id = await getUserData()
  getOthersData(id)
})
</script>

<template>
  <el-container class="container">
    <el-aside width="280px" class="p-4 font-medium bg-white relative">
      <div class="mb-1">Просмотр этапов</div>
      <div class="">
        <div class="menu">
          <div class="menu__item" v-for="(item, index) in menu" :key="index">{{ item.label }}</div>
        </div>
      </div>
      <el-button type="primary" class="menu__btn-hollow" @click="router.push('/user-lc/')">
        <BackIcon class="w-6 h-6 mr-2" />
        К списку
      </el-button>
    </el-aside>
    <el-main class="main px-10 relative">
      <div class="text-3xl font-medium mb-5">Все этапы</div>
      <div v-if="otherData.length !== 0" class="pb-4 border-b border-gray-300">
        <div class="opacity-40">Предыдущие этапы</div>
        <div v-for="(item, idx) in otherData" :key="idx">
          <component :is="BaseUser" v-model="item.data" :label="item.label" disabled></component>
        </div>
      </div>
      <div class="pb-4">
        <div v-for="(item, idx) in userData" :key="idx">
          <component :is="BaseUser" v-model="item.data" :label="item.label"></component>
        </div>
      </div>
      <div class="h-24 border-t border-gray-200 absolute bottom-0 left-0 right-0 p-5">
        <el-button class="user__button" size="default" @click="done">Завершить</el-button>
      </div>
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

.user__button {
  @apply w-full rounded-xl bg-blue-700 text-white h-12;
}

.menu__btn-hollow {
  @apply text-black rounded-xl bg-white border-gray-300 hover:bg-white hover:text-black absolute bottom-5 left-4 right-4;
}
</style>
