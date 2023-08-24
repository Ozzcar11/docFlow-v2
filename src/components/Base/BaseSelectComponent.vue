<script lang="ts" setup>
import InputIcon from "@/assets/icons/InputIcon.vue"
import ChatIcon from "@/assets/icons/ChatIcon.vue"
import DocsIcon from "@/assets/icons/DocsIcon.vue"

const iconComponents = { input: InputIcon, text: ChatIcon, docs: DocsIcon }

interface selectOptions {
  icon: string
  value: string
  label: string
}

const options: selectOptions[] = [
  {
    icon: "text",
    value: "0",
    label: "Текст",
  },
  {
    icon: "input",
    value: "1",
    label: "Поле для ввода",
  },
  {
    icon: "docs",
    value: "2",
    label: "Загрузка документов",
  },
]
</script>

<template>
  <div>
    <el-select class="base-select-component" placeholder="Добавить элемент" @change="$emit('update:modelValue', $event)">
      <template #prefix="">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </template>
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
        ><div class="flex items-center">
          <component :is="iconComponents[item.icon as keyof typeof iconComponents]" class="inline -ml-2"></component> <span class="ml-2">{{ item.label }}</span>
        </div>
      </el-option>
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
    padding: 6px 12px 8px 6px;
    &:focus {
      box-shadow: none;
    }
  }
}
</style>
