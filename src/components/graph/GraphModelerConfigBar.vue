<template>
  <template v-if="nodeData === undefined">
    <span class="block text-center opacity-30 text-xl mt-14">Выберите или создайте этап</span>
  </template>
  <template v-else>
    <div v-if="nodeData.gd.isConfigurable" class="mb-4 flex justify-between">
      <el-button class="config-buttons text-gray-600" @click="deleteNode" type="danger" plain>Удалить</el-button>
      <div>
        <el-button class="config-buttons text-gray-600" @click="hideConfigBar">Отмена</el-button>
        <el-button class="config-buttons text-white bg-blue-700" @click="saveNode">Сохранить</el-button>
      </div>
    </div>
    <BaseInput twClass="text-xl" class="mb-5" placeholder="Название" v-model="nodeData.gd.nodeConfig.name" />
    <div class="grid grid-cols-2 gap-y-2 my-5">
      <div class="text-sm text-gray-600 flex items-center">Проверяющий</div>
      <BaseSelect v-model="nodeData.gd.stageData.checkNames" :options="users" />
      <div class="text-sm text-gray-600 flex items-center">Ответственный</div>
      <BaseSelect v-model="nodeData.gd.stageData.responsibleNames" :options="users" />
      <div class="text-sm text-gray-600 flex items-center">Наблюдатели</div>
      <BaseSelect v-model="nodeData.gd.stageData.watchersNames" :options="users" />
    </div>
    <hr class="my-5" />
    <div v-for="(item, idx) in nodeData.gd.configData" :key="idx">
      <component :is="configComponents[item.component as keyof typeof configComponents]" v-model="item.data"></component>
    </div>
    <div class="mt-4">
      <BaseSelectComponent @addComponent="addComponent" />
    </div>
  </template>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue"
import type { Ref } from "vue"

import type { Node } from "@/utils/graph"

import { configComponents } from "@/utils/config-components"

import BaseInput from "../Base/BaseInput.vue"
import BaseSelect from "../Base/BaseSelect.vue"
import BaseSelectComponent from "../Base/BaseSelectComponent.vue"
import { ConfigAPI } from "@/api/config"

const props = defineProps<{
  cell: any
}>()

const nodeData = ref()

watch(
  () => props.cell,
  (value) => {
    nodeData.value = value
  },
)

const emits = defineEmits(["saveNode", "hideConfig", "deleteNode", "refreshElemetsBar"])

const users = [
  {
    value: "1",
    label: "Атав",
  },
  {
    value: "2",
    label: "Мухтар",
  },
  {
    value: "3",
    label: "Рашид",
  },
  {
    value: "4",
    label: "Залимхан",
  },
  {
    value: "5",
    label: "Иса",
  },
]

const addComponent = (component: string) => {
  nodeData.value?.gd.configData.push({
    component,
    data: "",
  })
}

const hideConfigBar = () => {
  emits("hideConfig")
}

const saveNode = async () => {
  if (nodeData.value.gd.isNew) {
    const res = await ConfigAPI.createNode({
      name: nodeData.value.gd.nodeConfig.name,
      schema: nodeData.value.gd.configData,
    })
    emits("refreshElemetsBar")
    return
  }

  console.log(nodeData.value)

  hideConfigBar()
}

const deleteNode = () => {
  emits("deleteNode", props.cell)
  hideConfigBar()
}

// const nodeNameRef = ref("")
// const nodeName = computed({
//   get() {
//     nodeNameRef.value
//     return props.cell?.getData().nodeData.gd.nodeConfig.name ?? ""
//   },
//   set(value) {
//     nodeNameRef.value = value
//     props.cell?.setData({ nodeData: { gd: { nodeConfig: { name: value } } } })
//     emit("changeNode", props.cell?.getData())
//   },
// })
// const edge_content_ref = ref("");

// const edge_content = computed({
//   get() {
//     const edge = props.cell as Edge;
//     edge_content_ref.value;
//     return edge.getLabelAt(0)?.attrs?.text?.text?.toString() ?? "";
//   },
//   set(value: string) {
//     const edge = props.cell as Edge;
//
//     const edge_label = default_edge_label(value);
//     if (edge_label != null) {
//       edge.removeLabelAt(0);
//       edge.setLabelAt(0, edge_label);
//     }
//
//     edge_content_ref.value = value;
//     edge.setData({ value });
//   },
// });
</script>

<style lang="scss" scoped>
input {
  @apply border border-gray-200;
}

.config-buttons {
  @apply text-xs font-medium p-2.5 rounded-lg;
}
</style>
