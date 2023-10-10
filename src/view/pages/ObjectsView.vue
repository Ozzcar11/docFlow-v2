<script setup lang="ts">
import EditIcon from "@/assets/icons/EditIcon.vue"
import PlusIcon from "@/assets/icons/PlusIcon.vue"

import { Search } from "@element-plus/icons-vue"

import router from "../router"

import { ref, onMounted } from "vue"
import type { Ref } from "vue"
import { ObjectsAPI } from "@/api/objects"

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
])

const getProjects = async () => {
  const res = await ObjectsAPI.getProjects()
  tableData.value = res.data
}

const newName = ref("")

const createObject = () => {}

onMounted(() => {
  getProjects()
})
</script>

<template>
  <el-header class="header-users">
    <div class="flex ml-1">
      <div class="text-2xl">Объекты</div>
      <span class="mx-4 text-2xl opacity-10">|</span>
      <el-input v-model="newName" class="create-newobject" placeholder="Введите название объекта для создания" clearable></el-input>
      <el-button v-if="newName.length !== 0" type="primary" class="header-users__button" @click="createObject">
        Создать
        <PlusIcon class="w-6 h-6 ml-2" />
      </el-button>
    </div>
    <!-- <div class="mr-20">
      <el-input v-model="searchValue" class="header-users__search-input" placeholder="Поиск" :prefix-icon="Search" />
    </div> -->
  </el-header>
  <el-main>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="Название" />
      <el-table-column prop="user" label="Пользователь" />
      <el-table-column prop="last_change" label="Последнее изменение" />
      <el-table-column prop="date_create" label="Дата создания" />
      <el-table-column>
        <template #default="{ row: { id } }">
          <router-link :to="`/project/${id}`">
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

.create-newobject {
  @apply mr-3 w-96 h-10;
}
</style>
