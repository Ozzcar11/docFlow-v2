<script lang="ts" setup>
defineProps<{
  modelValue: string | number | undefined
  twClass?: string
  placeholder?: string
}>()
</script>

<template>
  <div>
    <el-input class="base-input" :class="twClass" :modelValue="modelValue" :placeholder="placeholder" @input="$emit('update:modelValue', $event)" />
  </div>
</template>

<style lang="scss">
.base-input {
  &.text-xl {
    .el-input__inner {
      font-size: 20px;
    }
  }
  .el-input__wrapper {
    @apply relative p-0 pb-2 border-none rounded-none shadow-none overflow-hidden;
    .el-input__inner {
      padding: 0;
      &:focus {
        box-shadow: none;
      }
    }
    &::after {
      @apply content-[''] absolute bottom-0 -left-full w-full h-px bg-blue-700;
      transition: left 0.2s ease-in-out;
    }
    &.is-focus {
      &::after {
        @apply left-0;
      }
    }
  }
}
</style>
