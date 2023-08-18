<script lang="ts" setup>
defineProps<{
  modelValue: string | number | undefined
}>()
</script>

<template>
  <div>
    <el-input :modelValue="modelValue" placeholder="" @input="$emit('update:modelValue', $event)" />
  </div>
</template>

<style lang="scss"></style>
