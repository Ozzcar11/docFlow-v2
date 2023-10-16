<script setup lang="ts">
import BackIcon from "@/assets/icons/BackIcon.vue"
import CloseIcon from "@/assets/icons/CloseIcon.vue"
import PlusIcon from "@/assets/icons/PlusIcon.vue"
import EditIcon from "@/assets/icons/EditIcon.vue"

import { useRoute } from "vue-router"

const route = useRoute()

import { Search } from "@element-plus/icons-vue"

import router from "../router"

import { ref, computed, onMounted } from "vue"
import type { Ref } from "vue"
import { UsersAPI } from "@/api/users"

import { DepartmentsAPI } from "@/api/departments"
import { async } from "@antv/x6/lib/registry/marker/async"

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

const userData = ref({
  last_name: "",
  first_name: "",
  middle_name: "",
  login: "",
  job: "",
  password: "",
  description: "",
})

const tableData = ref([])

const sortedTableData = computed(() => {
  return tableUserData.value
})

const addToGroup = async () => {
  const result = Object.keys(tableUserDataChecked.value).map((item) => +item)
  const res = await DepartmentsAPI.deleteUser({
    id_department: +route.params.id,
    id_users: result,
    action: "add",
  })

  const second = await DepartmentsAPI.getDepartment(route.params.id)
  tableData.value = second.data

  dialogVisible.value = false
}

const createNewUser = async () => {
  const res = await UsersAPI.createUser(userData.value)

  await DepartmentsAPI.deleteUser({
    id_department: route.params.id,
    id_users: [res.data.id],
    action: "add",
  })

  getUsers()
  getUserData()

  dialogCreateUser.value = false
}

const createUser = () => {
  dialogVisible.value = false
  dialogCreateUser.value = true
}

const tableUserDataChecked = ref([])

const dialogVisible = ref(false)
const dialogLeader = ref(false)
const dialogCreateUser = ref(false)

const addUser = () => {
  dialogVisible.value = true
}

const departments = [
  {
    value: "Frontend",
    label: "Фронтэнд",
  },
  {
    value: "Backend",
    label: "Бекэнд",
  },
]

const groupLeader = computed(() => {
  if (tableData.value.length !== 0) return tableData.value.find((item) => item?.is_chief === "True").full_name
  else return "Нет руководителя"
})

const deleteUser = async (id) => {
  const res = await DepartmentsAPI.deleteUser({
    id_department: +route.params.id,
    id_users: [id],
    action: "remove",
  })
  //   tableData.value = tableData.value.filter((item) => item.id !== id)
  getUsers()
  getUserData()
}

const changeLeader = () => {
  getUsers()
  dialogLeader.value = false
}

const getUsers = async () => {
  const res = await DepartmentsAPI.getDepartment(route.params.id)
  tableData.value = res.data
}

const usersData = ref([])

const dontExistUsers = computed(() => {
  return usersData.value.filter((item) => !item.groups.find((item) => item.id === +route.params.id))
})

const getUserData = async () => {
  const res = await UsersAPI.getUsers()
  usersData.value = res.data
}

onMounted(() => {
  getUsers()
  getUserData()
})
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
        <div class="">Руководитель: {{ groupLeader }}</div>
        <!-- <el-button class="w-6 h-6 ml-3" @click="dialogLeader = true"><EditIcon /></el-button> -->
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="full_name" label="ФИО" />
      <el-table-column prop="username" label="Логин" />
      <el-table-column prop="job" label="Должность" />
      <el-table-column width="100">
        <template #default="{ row: { id } }">
          <CloseIcon @click="deleteUser(id)" style="cursor: pointer" />
        </template>
      </el-table-column>
    </el-table>
  </el-main>
  <el-dialog class="dialog" v-model="dialogVisible" title="Добавление сотрудников в отдел" width="50%">
    <!-- <el-input v-model="usersSearch" class="dialog-group__input" placeholder="Поиск" :prefix-icon="Search" /> -->
    <el-table class="group-adduser" :data="dontExistUsers" width="100%">
      <el-table-column prop="first_name" />
      <el-table-column prop="job" />
      <el-table-column width="50">
        <template #default="{ row: { id } }">
          <el-checkbox v-model="tableUserDataChecked[id]" size="large" />
        </template>
      </el-table-column>
    </el-table>
    <div>
      <button @click="createUser" class="px-2.5 py-3 rounded-xl bg-gray-200 mt-4 w-full text-left flex justify-between">
        <span
          >Создать пользователя <b>{{ usersSearch }}</b></span
        >
        <PlusIcon color="black" />
      </button>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false" class="header-groups__button font-medium px-4 py-2.5 rounded-xl h-10">Отмена</el-button>
        <el-button @click="addToGroup" class="header-groups__button_blue"> Сохранить </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog class="dialog" v-model="dialogLeader" title="Руководитель отдела" width="50%">
    <el-table :data="usersData" style="overflow-y: auto; max-height: 500px" width="100%">
      <el-table-column prop="first_name" />
      <el-table-column prop="job" />
      <el-table-column width="50">
        <template #default="{ row: { id } }">
          <el-checkbox v-model="tableUserDataChecked[id]" size="large" />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false" class="header-groups__button font-medium px-4 py-2.5 rounded-xl h-10">Отмена</el-button>
        <el-button @click="changeLeader" class="header-groups__button_blue"> Сохранить </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog class="dialog-create-user" v-model="dialogCreateUser" title="Создание сотрудника" width="50%">
    <el-row>
      <el-col :span="14">Фамилия</el-col>
      <el-col :span="10"><el-input v-model="userData.last_name" class="create-user__input" clearable></el-input> </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">Имя</el-col>
      <el-col :span="10"><el-input v-model="userData.first_name" class="create-user__input" clearable></el-input> </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">Отчество</el-col>
      <el-col :span="10"><el-input v-model="userData.middle_name" class="create-user__input" clearable></el-input> </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">Логин</el-col>
      <el-col :span="10">
        <el-input v-model="userData.username" class="create-user__input" clearable></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">Пароль</el-col>
      <el-col :span="10">
        <el-input v-model="userData.password" type="password" class="create-user__input" clearable></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">Должность</el-col>
      <el-col :span="10">
        <el-select v-model="userData.job" class="w-full create-select" placeholder="Выберите должность">
          <el-option v-for="item in departments" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14">Доп. информация</el-col>
      <el-col :span="10"> <el-input v-model="userData.description" maxlength="100" class="create-user__textarea" placeholder="Введите текст" show-word-limit type="textarea" /> </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogCreateUser = false" class="header-groups__button font-medium px-4 py-2.5 rounded-xl h-10">Отмена</el-button>
        <el-button @click="createNewUser" class="header-groups__button_blue"> Сохранить </el-button>
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
  &-create-user {
    border-radius: 12px;
    padding: 30px;
    .el-input__wrapper {
      @apply rounded-xl px-3 py-1.5;
    }
    .el-row {
      align-items: center;
    }
    .el-row + .el-row {
      margin-top: 20px;
    }
  }
}

.group-adduser {
  overflow-y: auto;
  max-height: 500px;
}
</style>
