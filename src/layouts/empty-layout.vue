<script lang="ts" setup>
import { provide } from "vue"

const test = (test: string) => {
  console.log("test", test)
}

provide("test", test)
</script>

<template>
  <div class="layout">
    <div class="layout__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100vh;
  background-color: var(--surface-black);
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    width: 400px;
    height: 600px;
    background-color: var(--surface-white);
    border-radius: 3%;
    box-shadow: 0 0 40px 10px var(--surface-purple);
    transition: box-shadow 0.5s ease-out;
  }
}
</style>
