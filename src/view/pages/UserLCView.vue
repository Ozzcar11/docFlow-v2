<script setup lang="ts">
import router from "../router"
import BackIcon from "@/assets/icons/BackIcon.vue"
import CheckIcon from "@/assets/icons/CheckIcon.vue"

import { ref } from "vue"

const saveUser = () => {
  console.log("save")
}

const userData = ref({
  secondName: "",
  name: "",
  thName: "",
  login: "",
  departments: "",
  role: "",
  additionalData: "",
})

const departments = [
  {
    value: "admin",
    label: "Администратор",
  },
]
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
      <el-breadcrumb-item>Редактирование</el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
  <el-main class="create-main">
    <el-row>
      <el-col :span="8">Фамилия</el-col>
      <el-col :span="6"><el-input v-model="userData.secondName" class="create-user__input" clearable></el-input> </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Имя</el-col>
      <el-col :span="6"><el-input v-model="userData.name" class="create-user__input" clearable></el-input> </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Отчество</el-col>
      <el-col :span="6"><el-input v-model="userData.thName" class="create-user__input" clearable></el-input> </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Логин</el-col>
      <el-col :span="6">
        <el-input v-model="userData.login" class="create-user__input" clearable></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Должность</el-col>
      <el-col :span="6">
        <el-select v-model="userData.role" class="w-full create-select" placeholder="Выберите должность">
          <el-option v-for="item in departments" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Доп. информация</el-col>
      <el-col :span="6"> <el-input v-model="userData.additionalData" maxlength="100" class="create-user__textarea" placeholder="Введите текст" show-word-limit type="textarea" /> </el-col>
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
