<script setup lang="ts">
import BackIcon from "@/assets/icons/BackIcon.vue"
import CloseIcon from "@/assets/icons/CloseIcon.vue"
import PlusIcon from "@/assets/icons/PlusIcon.vue"
import EditIcon from "@/assets/icons/EditIcon.vue"

import { Search } from "@element-plus/icons-vue"

import router from "../router"

import { ref } from "vue"
import type { Ref } from "vue"

const usersSearch = ref("")

const tableUserData = ref([
  {
    id: 12,
    name: "Мухтаров Мухтар Мухтарович",
    role: "Backend",
  },
  {
    id: 11,
    name: "Мухтаров Мухтар Мухтарович",
    role: "Backend",
  },
])

const tableData = ref([
  {
    id: 2,
    name: "Мухтаров Мухтар Мухтарович",
    login: "MukhtariLoveAnime",
    role: "Backend",
  },
])

const addToGroup = () => {
  console.log(tableUserDataChecked)
}

const tableUserDataChecked = ref([])

const dialogVisible = ref(false)

const addUser = () => {
  dialogVisible.value = true
}
</script>

<template>
  <el-header class="header-groups">
    <el-button type="primary" class="header-groups__button" @click="router.push('/groups')">
      <BackIcon class="w-6 h-6 mr-2" />
      К списку
    </el-button>
    <span class="mx-4 text-2xl opacity-10 h-10">|</span>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/groups' }">Отделы</el-breadcrumb-item>
      <el-breadcrumb-item>Редактирование</el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
  <el-main>
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center">
        <div class="mr-4 text-2xl font-medium">Разработчики</div>
        <el-button class="header-groups__button_blue" @click="addUser"> <PlusIcon class="w-6 h-6 mr-2" /> Добавить сотрудников</el-button>
      </div>
      <div class="flex items-center">
        <div class="">Руководитель: Магомедов Магомед</div>
        <el-button class="w-6 h-6 ml-3" @click=""><EditIcon /></el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="ФИО" />
      <el-table-column prop="login" label="Логин" />
      <el-table-column prop="role" label="Должность" />
      <el-table-column width="100">
        <template #default="{ row: { id } }">
          <router-link :to="`/groups/${id}`">
            <CloseIcon />
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
  <el-dialog class="dialog" v-model="dialogVisible" title="Добавление сотрудников в отдел" width="50%">
    <el-input v-model="usersSearch" class="dialog-group__input" placeholder="Поиск" :prefix-icon="Search" />
    <el-table :data="tableUserData" width="100%">
      <el-table-column prop="name" />
      <el-table-column prop="role" />
      <el-table-column width="50">
        <template #default="{ row: { id } }">
          <el-checkbox v-model="tableUserDataChecked[id]" size="large" />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false" class="header-groups__button font-medium px-4 py-2.5 rounded-xl h-10">Отмена</el-button>
        <el-button @click="addToGroup" class="header-groups__button_blue"> Сохранить </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.header-groups {
  @apply flex items-center h-20;

  border-bottom: 1px solid #e9ebec;
  &__search-input {
    width: 600px;
    .el-input__wrapper {
      @apply rounded-xl px-3 py-1.5;
    }
  }
  &__button {
    @apply font-medium text-black bg-white border-gray-300 hover:bg-white hover:text-black px-4 py-2.5 rounded-xl h-10;
  }

  &__button_blue {
    @apply bg-blue-600 font-medium px-4 py-2.5 rounded-xl h-10 text-white;
  }
}

.dialog {
  @apply rounded-lg;
  &-group__input {
    .el-input__wrapper {
      @apply rounded-xl px-3 py-1.5;
    }
  }
}
</style>
