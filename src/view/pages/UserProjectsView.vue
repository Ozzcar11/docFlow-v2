<script setup lang="ts">
import { ref, onMounted } from "vue"
import EditIcon from "@/assets/icons/EditIcon.vue"
import BackIcon from "@/assets/icons/BackIcon.vue"

import { UsersAPI } from "@/api/users"
import router from "../router"
import { useAuthStore } from "@/stores/auth"

const tableData = ref([])

const getProjects = async () => {
  const { data } = await UsersAPI.getUserProjects()

  tableData.value = Object.entries(data).map((item) => {
    return {
      id: item[0],
      label: item[1],
    }
  })
}

const logout = () => {
  useAuthStore().logout()
  localStorage.removeItem("isAdmin")
  router.push("/login")
}

onMounted(() => {
  getProjects()
})
</script>

<template>
  <div class="m-auto w-2/3">
    <div class="text-4xl font-semibold text-center my-5">Выбор объекта</div>
    <el-table :data="tableData">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="label" label="Название" />
      <el-table-column width="50">
        <template #default="{ row: { id } }">
          <router-link :to="`/user-lc/${id}/`">
            <EditIcon />
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="">
      <el-button type="primary" class="main-btn" @click="logout">
        <BackIcon class="w-6 h-6 mr-2" />
        Выйти
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-btn {
  @apply absolute left-1/2 w-96  -translate-x-1/2 bottom-4 font-medium text-black bg-white border-gray-300 hover:bg-white hover:text-black px-4 py-2.5 rounded-xl h-10;
}
</style>
