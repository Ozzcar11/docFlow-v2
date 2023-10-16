<script setup lang="ts">
import { ref, onMounted } from "vue"
import EditIcon from "@/assets/icons/EditIcon.vue"

import { UsersAPI } from "@/api/users"

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
  </div>
</template>
