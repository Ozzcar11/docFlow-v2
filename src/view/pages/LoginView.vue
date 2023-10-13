<script setup lang="ts">
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { useAuthStore } from "@/stores/auth"

import router from "../router"

const formData = ref({
  username: "",
  password: "",
})

const authStore = useAuthStore()

const login = async () => {
  try {
    await authStore.login(formData.value)
    if (authStore.isAdmin) {
      router.push("/")
    } else {
      router.push("user-lc")
    }
  } catch (e) {
    ElMessage.error("Проверьте правильность введённых полей")
  }
}
</script>

<template>
  <div class="h-screen relative">
    <div class="login__title">Карточка объекта</div>
    <div class="login__container">
      <div class="mb-8 text-2xl font-medium text-center">Авторизация</div>
      <el-input class="login__input mb-3" v-model="formData.username" placeholder="Логин" clearable></el-input>
      <el-input class="login__input" v-model="formData.password" type="password" show-password placeholder="Пароль" clearable></el-input>
      <el-button class="login__btn" @click="login">Войти</el-button>
    </div>
  </div>
</template>

<style lang="scss">
.login {
  &__title {
    @apply text-4xl font-semibold mx-16 pt-12;
    color: #5c69ab;
  }
  &__container {
    @apply absolute  left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center;
    top: 45%;
  }

  &__input {
    width: 400px;
    .el-input__wrapper {
      @apply rounded-xl px-3 py-1.5;
    }
  }

  &__btn {
    width: 400px;
    @apply mt-12 font-medium bg-blue-600 px-4 py-2.5 rounded-xl h-10 text-white;
  }
}
</style>
