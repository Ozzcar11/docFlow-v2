<script lang="ts" setup>
import { provide } from "vue"
import { useMouse } from "@/composables/useMouse"

const { x, y } = useMouse()

const test = (test: string) => {
  console.log("test", test)
}

provide("test", test)
</script>

<template>
  <div class="layout">
  <div class="layout__top-left">{{ '<h1>' }} </div>
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
    transition: box-shadow 0.5s ease-out;
    animation: pulse 2s infinite ease-in;
  }

  &__top-left {
    color: #fff;
    font-size: 92px;
    font-weight: 700;
    position: absolute;
    top: 10%;
    left: 5%;
    width: 100px;
    height: 100px;
    transform: rotate(-30deg);
  }
}
</style>
