<script setup lang="ts">
import { ref, onMounted } from "vue"
import { UsersAPI } from "@/api/users"

const tableData = ref([])

const getProjects = async () => {
  const res = await UsersAPI.getUserProject()
}
onMounted(() => {
  getProjects()
})
</script>

<template>
  <div class="m-auto w-2/3">
    <div class="text-4xl font-semibold text-center my-5">Выбор объекта</div>
    <el-table :data="tableData">
      <el-table-column type="index" width="50" />
    </el-table>
  </div>
</template>
