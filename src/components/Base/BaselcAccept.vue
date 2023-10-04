<script lang="ts" setup>
import DeleteIcon from "@/assets/icons/DeleteIcon.vue"
import lcIcon from "@/assets/icons/lcIcon.vue"
</script>

<template>
  <div>
    <div class="flex align-middle mt-4">
      <lcIcon label="Работа с 1С: Принять" class="w-full" />
      <button class="w-8 h-8 flex justify-center items-center" @click="$emit('deleteField')"><DeleteIcon /></button>
    </div>
  </div>
</template>
