<script lang="ts" setup>
defineProps<{
  modelValue: string[]
  options: Array<{
    value: string
    label: string
  }>
}>()
</script>

<template>
  <div>
    <el-select class="base-select-component" :modelValue="modelValue" placeholder="Добавить элемент" multiple collapse-tags @change="$emit('update:modelValue', $event)">
      <template #prefix="">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </template>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<style lang="scss">
.base-select-component {
  width: 100%;
  .el-input {
    .el-input__wrapper {
      padding: 2px 4px;
      border-radius: 10px;
      box-shadow: none;
    }
  }
  .el-input__inner {
    padding: 6px 12px 8px;
    &:focus {
      box-shadow: none;
    }
  }
}
</style>
