<script setup lang="ts">
import PlusIcon from "@/assets/icons/PlusIcon.vue"
import { ref, onMounted, computed } from "vue"
import router from "../router"

import { DepartmentsAPI } from "@/api/departments"
import { UsersAPI } from "@/api/users"
const setLeader = ref([])

const groupData = ref({
  name: "",
  chief: null,
})

const addGroup = async () => {
  groupData.value.chief = +Object.keys(setLeader.value)[0]
  const res = await DepartmentsAPI.createDepartment(groupData.value)
  router.push("/groups/")
}

const saveLeader = () => {
  dialogLeader.value = false
}

const chief = computed(() => {
  const res = usersData.value.find((item) => setLeader.value.find((item1, idx) => idx == item.id))
  console.log(res)

  if (res) return res
  return null
})

const usersData = ref([])
const dialogLeader = ref(false)

const getUsers = async () => {
  const res = await UsersAPI.getUsers()
  usersData.value = res.data
}

onMounted(() => {
  getUsers()
})
</script>

<template>
  <el-header class="header-users">
    <div class="flex ml-1">
      <div class="text-2xl">Создание отдела</div>
      <span class="mx-4 text-2xl opacity-10">|</span>
      <el-button type="primary" class="header-users__button" @click="addGroup">
        Добавить
        <PlusIcon class="w-6 h-6 ml-2" />
      </el-button>
    </div>
  </el-header>
  <el-main>
    <el-row class="mb-3">
      <el-col :span="8">Название</el-col>
      <el-col :span="6"><el-input v-model="groupData.name" class="create-user__input" clearable></el-input> </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Руководитель</el-col>
      <el-button class="header-users__button white-btn" size="default" @click="dialogLeader = true">{{ chief?.first_name ?? "Выберите руководителя" }}</el-button>
    </el-row>
  </el-main>
  <el-dialog class="dialog" v-model="dialogLeader" title="Руководитель отдела" width="50%">
    <el-table :data="usersData" class="create-dialog" width="100%">
      <el-table-column prop="first_name" />
      <el-table-column prop="job" />
      <el-table-column width="50">
        <template #default="{ row: { id } }">
          <el-checkbox v-model="setLeader[id]" size="large" />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogLeader = false" class="header-groups__button font-medium px-4 py-2.5 rounded-xl h-10">Отмена</el-button>
        <el-button @click="saveLeader" class="header-groups__button_blue"> Сохранить </el-button>
      </span>
    </template>
  </el-dialog>
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

.white-btn {
  @apply text-white;
}

.create-dialog {
  max-height: 500px;
  overflow-y: auto;
}
</style>
