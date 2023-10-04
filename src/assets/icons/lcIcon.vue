<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <div class="flex items-center">
    <div class="w-5 h-5 flex items-center">
      <img class="w-full object-cover" src="@/assets/images/lc.png" alt="1c" />
    </div>
    <span class="ml-2">{{ label }}</span>
  </div>
</template>
