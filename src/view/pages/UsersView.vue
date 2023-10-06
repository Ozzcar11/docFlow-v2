<script setup lang="ts">
import EditIcon from "@/assets/icons/EditIcon.vue"
import PlusIcon from "@/assets/icons/PlusIcon.vue"

import { Search } from "@element-plus/icons-vue"

import router from "../router"

import { ref } from "vue"
import type { Ref } from "vue"

const searchValue: Ref<string> = ref("")

const tableData = ref([
  {
    id: 1,
    name: "Магомедов Магомед Магомедович",
    login: "magomed",
    dep: "Несколько",
    role: "Администратор",
    lustVisit: "26.09.2023, 16:56",
  },
  {
    id: 2,
    name: "Магомедов Магомед Магомедович",
    login: "magomed",
    dep: "Несколько",
    role: "Администратор",
    lustVisit: "26.09.2023, 16:56",
  },
  {
    id: 3,
    name: "Магомедов Магомед Магомедович",
    login: "magomed",
    dep: "Несколько",
    role: "Администратор",
    lustVisit: "26.09.2023, 16:56",
  },
  {
    id: 4,
    name: "Магомедов Магомед Магомедович",
    login: "magomed",
    dep: "Несколько",
    role: "Администратор",
    lustVisit: "26.09.2023, 16:56",
  },
  {
    id: 5,
    name: "Магомедов Магомед Магомедович",
    login: "magomed",
    dep: "Несколько",
    role: "Администратор",
    lustVisit: "26.09.2023, 16:56",
  },
  {
    id: 6,
    name: "Магомедов Магомед Магомедович",
    login: "magomed",
    dep: "Несколько",
    role: "Администратор",
    lustVisit: "26.09.2023, 16:56",
  },
  {
    id: 7,
    name: "Магомедов Магомед Магомедович",
    login: "magomed",
    dep: "Несколько",
    role: "Администратор",
    lustVisit: "26.09.2023, 16:56",
  },
  {
    id: 8,
    name: "Магомедов Магомед Магомедович",
    login: "magomed",
    dep: "Несколько",
    role: "Администратор",
    lustVisit: "26.09.2023, 16:56",
  },
  {
    id: 9,
    name: "Магомедов Магомед Магомедович",
    login: "magomed",
    dep: "Несколько",
    role: "Администратор",
    lustVisit: "26.09.2023, 16:56",
  },
  {
    id: 10,
    name: "Магомедов Магомед Магомедович",
    login: "magomed",
    dep: "Несколько",
    role: "Администратор",
    lustVisit: "26.09.2023, 16:56",
  },
  {
    id: 11,
    name: "Магомедов Магомед Магомедович",
    login: "magomed",
    dep: "Несколько",
    role: "Администратор",
    lustVisit: "26.09.2023, 16:56",
  },
])
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
    <div class="mr-20">
      <el-input v-model="searchValue" class="header-users__search-input" placeholder="Поиск" :prefix-icon="Search" />
    </div>
  </el-header>
  <el-main>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="ФИО" />
      <el-table-column prop="login" label="Логин" />
      <el-table-column prop="dep" label="Отдел" />
      <el-table-column prop="role" label="Роль" />
      <el-table-column prop="lustVisit" label="Последний визит" />
      <el-table-column>
        <template #default="{ row: { id } }">
          <router-link :to="`/users/${id}`">
            <EditIcon />
          </router-link>
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
