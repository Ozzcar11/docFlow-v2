<script setup lang="ts">
import { UsersAPI } from "@/api/users"
import router from "../router"
import BackIcon from "@/assets/icons/BackIcon.vue"
import CheckIcon from "@/assets/icons/CheckIcon.vue"

import { ElMessage } from "element-plus"

import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const saveUser = async () => {
  if (userData.value.password === undefined) {
    const res = await UsersAPI.changeUser(userData.value.id, userData.value)
    router.push("/users/")
    ElMessage({
      message: "Пользователь успешно сохранён",
      type: "success",
    })
  } else {
    const res = await UsersAPI.createUser(userData.value)
    router.push("/users/")
    ElMessage({
      message: "Пользователь успешно создан",
      type: "success",
    })
  }
}

const userData = ref({
  id: "",
  last_name: "",
  first_name: "",
  middle_name: "",
  username: "",
  job: "",
  description: "",
  password: "",
})

const departments = [
  {
    value: "admin",
    label: "Администратор",
  },
]

const getUser = async () => {
  if (route.params.id !== "create-user") {
    const { data } = await UsersAPI.getUser(route.params.id)
    userData.value = data
    console.log(userData.value)
  }
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <el-header class="header__create-users">
    <el-button type="primary" class="create-user__button create-user__button_white" @click="router.push('/users/')">
      <BackIcon class="w-6 h-6 mr-2" />
      Отменить
    </el-button>
    <el-button type="primary" class="create-user__button create-user__button_blue" @click="saveUser">
      Сохранить
      <CheckIcon class="w-6 h-6 ml-2" />
    </el-button>
    <span class="mx-4 text-2xl opacity-10 align-middle h-10">|</span>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/users' }">Пользователи</el-breadcrumb-item>
      <el-breadcrumb-item v-if="userData.password !== undefined">Редактирование</el-breadcrumb-item>
      <el-breadcrumb-item v-else>Редактирование</el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
  <el-main class="create-main">
    <el-row>
      <el-col :span="8">Фамилия</el-col>
      <el-col :span="6"><el-input v-model="userData.last_name" class="create-user__input" clearable></el-input> </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Имя</el-col>
      <el-col :span="6"><el-input v-model="userData.first_name" class="create-user__input" clearable></el-input> </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Отчество</el-col>
      <el-col :span="6"><el-input v-model="userData.middle_name" class="create-user__input" clearable></el-input> </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Логин</el-col>
      <el-col :span="6">
        <el-input v-model="userData.username" class="create-user__input" clearable></el-input>
      </el-col>
    </el-row>
    <el-row v-if="userData.password !== undefined">
      <el-col :span="8">Пароль</el-col>
      <el-col :span="6">
        <el-input v-model="userData.password" class="create-user__input" clearable></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Должность</el-col>
      <el-col :span="6">
        <el-select v-model="userData.job" class="w-full create-select" placeholder="Выберите должность">
          <el-option v-for="item in departments" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Доп. информация</el-col>
      <el-col :span="6"> <el-input v-model="userData.description" maxlength="100" class="create-user__textarea" placeholder="Введите текст" show-word-limit type="textarea" /> </el-col>
    </el-row>
  </el-main>
</template>

<style lang="scss">
.header__create-users {
  @apply flex items-center h-20;
  border-bottom: 1px solid #e9ebec;
}

.create-user__button {
  @apply font-medium px-4 py-2.5 rounded-xl h-10;
  &_white {
    @apply text-black bg-white border-gray-300 hover:bg-white hover:text-black;
  }
  &_blue {
    @apply bg-blue-600;
  }
}

.create-user__input {
  .el-input__wrapper {
    @apply rounded-xl px-3 py-1.5;
  }
}

.create-main {
  .el-row {
    align-items: center;
  }
  .el-row + .el-row {
    margin-top: 20px;
  }
}

.create-select {
  .el-input__wrapper {
    @apply rounded-xl px-3 py-1.5;
  }
}

.create-user__textarea {
  .el-textarea__inner {
    @apply rounded-xl;
  }
}
</style>
