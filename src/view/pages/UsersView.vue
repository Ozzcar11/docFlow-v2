<script setup lang="ts">
import EditIcon from "@/assets/icons/EditIcon.vue"
import PlusIcon from "@/assets/icons/PlusIcon.vue"
import CloseIcon from "@/assets/icons/CloseIcon.vue"

import { Search } from "@element-plus/icons-vue"

import router from "../router"

import { ref, onMounted } from "vue"
import type { Ref } from "vue"
import { UsersAPI } from "@/api/users"

const searchValue: Ref<string> = ref("")

const tableData = ref([])

const getUsers = async () => {
  const res = await UsersAPI.getUsers()
  tableData.value = res.data
}

const deleteUser = async (id) => {
  await UsersAPI.deleteUser(id)
  getUsers()
}

onMounted(() => {
  getUsers()
})
</script>

<template>
  <el-header class="header-users">
    <div class="flex ml-1">
      <div class="text-2xl">Пользователи</div>
      <span class="mx-4 text-2xl opacity-10">|</span>
      <el-button type="primary" class="header-users__button" @click="router.push('/users/create-user/')">
        Добавить
        <PlusIcon class="w-6 h-6 ml-2" />
      </el-button>
    </div>
    <!-- <div class="mr-20">
      <el-input v-model="searchValue" class="header-users__search-input" placeholder="Поиск" :prefix-icon="Search" />
    </div> -->
  </el-header>
  <el-main>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="middle_name" label="ФИО" />
      <el-table-column prop="username" label="Логин" />
      <el-table-column prop="groups" label="Отдел" />
      <el-table-column prop="job" label="Должность" />
      <!-- <el-table-column prop="lustVisit" label="Последний визит" /> -->
      <el-table-column width="50">
        <template #default="{ row: { id } }">
          <router-link :to="`/users/${id}`">
            <EditIcon />
          </router-link>
        </template>
      </el-table-column>
      <el-table-column width="50">
        <template #default="{ row: { id } }">
          <el-popconfirm title="Вы уверены что хотите удалить пользователя?" @confirm="deleteUser(id)" confirm-button-text="Да" cancel-button-text="Нет">
            <template #reference>
              <CloseIcon class="cursor-pointer" />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<style lang="scss">
.header-users {
  @apply flex items-center justify-between h-20;

  border-bottom: 1px solid #e9ebec;
  &__search-input {
    width: 600px;
    .el-input__wrapper {
      @apply rounded-xl px-3 py-1.5;
    }
  }
  &__button {
    @apply font-medium bg-blue-600 px-4 py-2.5 rounded-xl h-10;
  }
}
</style>
