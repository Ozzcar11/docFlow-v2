<template>
  <template v-if="nodeData === undefined">
    <span class="block text-center opacity-30 text-xl">Выберите элемент</span>
  </template>
  <template v-else>
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
  <!-- <div v-for="(item, index) in current_fields.configData" :key="index">
     <component :is="item.component"></component>
   </div> -->

  <!--  <div v-else-if="cell.isNode()" class="w-full p-3">
    <div class="">
      <span
        class="mb-2 text-ellipsis overflow-hidden font-mono block text-xl border-b border-gray-300"
        >{{
          (cell.getData() as AntvNodeData).gd ??
          `${typeToRu((cell.getData() as AntvNodeData).gd.component)}_${cell.id
            .toString()
            .substring(0, 8)}`
        }}</span
      >

      <div class="w-full">
        <button @click="cell?.remove()" class="btn btn-red">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
      <div v-for="(fields, field_group) in current_fields" :key="field_group">
        <div class="my-2">
          {{ fields }}
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="cell.isEdge()" class="w-full p-2">
    <div class="">
      <span class="mb-2 font-bold block text-2xl border-b border-gray-300"
        >Линия</span
      >

      <div>
        <button @click="cell?.remove()" class="btn btn-red">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      <div
        class="my-2"
        v-if="
          //  (cell.getSourceCell()?.getData() as AntvNodeData).gd.type ==
          //  'decision'
          false
        "
      >
        <span
          class="my-2 block border-b border-gray-300 uppercase font-bold text-sm text-gray-800"
          >Основные</span
        >

        <div class="block mt-2">
          <label>
            <span class="text-gray-700 block mb-1">Label</span>
            <input
              type="text"
              class="style-soft w-full"
              v-model="edge_content"
            />
          </label>
          <div class="w-full my-2 text-right">
            <button class="inline btn mr-2" @click="edge_content = 'Yes'">
              Да
            </button>
            <button class="inline btn" @click="edge_content = 'No'">Нет</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <span>Выбран неверный элемент</span>
  </div> -->
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue"
import type { Ref } from "vue"

import type { Node } from "@/utils/graph"

import { Cell } from "@antv/x6"

import { configComponents } from "@/utils/config-components"

import BaseInput from "../Base/BaseInput.vue"
import BaseSelect from "../Base/BaseSelect.vue"
import BaseSelectComponent from "../Base/BaseSelectComponent.vue"

const props = defineProps<{
  cell: Cell | undefined
}>()

const emit = defineEmits(["changeNode"])

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

const nodeData: Ref<Node | undefined> = ref(undefined)

watch(
  () => props.cell?.getData().nodeData,
  (value) => {
    nodeData.value = value
  },
)

watch(
  nodeData,
  (value) => {
    if (value) props.cell?.setData({ nodeData: value })
  },
  { deep: true },
)

const addComponent = (component: string) => {
  nodeData.value?.gd.configData.push({
    component,
    data: "",
  })
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
</style>
