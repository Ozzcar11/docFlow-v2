<script lang="ts" setup>
withDefaults(
  defineProps<{
    modelValue: string[] | number | string
    options: Array<{
      value: string
      label: string
    }>
    multiple?: boolean
  }>(),
  {
    multiple: false,
  },
)
</script>

<template>
  <div>
    <el-select class="base-select" :modelValue="modelValue" placeholder="Выбрать" :multiple="multiple" collapse-tags @change="$emit('update:modelValue', $event)">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<style lang="scss">
.base-select {
  .el-input {
    .el-input__wrapper {
      padding: 2px 12px;
      border-radius: 10px;
      box-shadow: 0 0 0 1px #727784;
    }
    &.is-focus .el-input__wrapper {
      // box-shadow: none !important;
    }
  }
  .el-input__inner {
    padding: 8px 12px 8px 4px;
    &:focus {
      box-shadow: none;
    }
  }
}
</style>
