<script lang="ts" setup>
import InputIcon from "@/assets/icons/InputIcon.vue"
import ChatIcon from "@/assets/icons/ChatIcon.vue"
import DocsIcon from "@/assets/icons/DocsIcon.vue"
import lcIcon from "@/assets/icons/lcIcon.vue"

import { ref } from "vue"

const emit = defineEmits(["addComponent"])

const iconComponents = { input: InputIcon, text: ChatIcon, docs: DocsIcon, lc: lcIcon }

interface selectOptions {
  icon: string
  value: string
  label: string
  children?: {
    value: string
    label: string
  }[]
}

const treeSelect = ref()

const options: selectOptions[] = [
  {
    icon: "text",
    value: "BaseText",
    label: "Текст",
  },
  {
    icon: "input",
    value: "BaseInput",
    label: "Поле для ввода",
  },
  {
    icon: "lc",
    label: "Работа с 1С",
    value: "test",
    children: [
      {
        value: "BaselcAccept",
        label: "Принять",
      },
      {
        value: "BaselcReserve",
        label: "Резервирование",
      },
    ],
  },
  {
    icon: "docs",
    value: "BaseFileInput",
    label: "Загрузка документов",
  },
]

const changeHandle = (e: keyof typeof iconComponents) => {
  emit("addComponent", e)
  treeSelect.value = undefined
}
</script>

<template>
  <div>
    <el-tree-select class="base-select-component" v-model="treeSelect" :data="options" placeholder="Добавить элемент" :render-after-expand="false" @change="changeHandle">
      <template #prefix="">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </template>
      <template #default="{ data: { icon, label } }"><component :is="iconComponents[icon as keyof typeof iconComponents]" class="inline" :label="label"></component></template>
    </el-tree-select>
    <!-- <el-select class="base-select-component" placeholder="Добавить элемент" @change="$emit('addComponent', $event)">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        <component :is="iconComponents[item.icon as keyof typeof iconComponents]" class="inline -ml-2" :label="item.label"></component>
      </el-option>
    </el-select> -->
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
