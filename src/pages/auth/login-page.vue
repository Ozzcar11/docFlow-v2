<script setup lang="ts">
import { inject } from "vue"

const testFunction = inject("test")

console.log(testFunction)
</script>

<template>
  <div class="login">
    <el-button @click="testFunction" type="primary">Default</el-button>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
