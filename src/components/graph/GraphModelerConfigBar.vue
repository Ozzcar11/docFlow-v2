<template>
  <template v-if="cell == null">
    <span class="block p-2 text-gray-700">Выберите элемент</span>
  </template>
  <template v-else>
    <div class="block p-2 text-gray-700">{{ current_field.name }}</div>
    <div v-for="(item, idx) in configData" :key="idx">
      <component
        :is="configComponents[item.component as keyof typeof configComponents]"
        v-model="item.data"
      ></component>
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
import { computed, ref, watch } from "vue";
import type { Ref } from "vue";

import { NodeConfig } from "@/utils/antv-model";

import { Cell } from "@antv/x6";

import { configComponents } from "@/utils/config-components";

const props = defineProps<{
  cell: Cell | undefined;
}>();

const current_field = computed(() => {
  return props.cell?.getData()?.nodeData.gd ?? "Выберите элемент";
});

const configData: Ref<NodeConfig[]> = ref([]);

watch(current_field, () => {
  if (typeof current_field.value === "object") {
    configData.value = current_field.value.configData;
  } else configData.value = [];
});

// const node_content_ref = ref("");
// const node_content = computed({
//   get() {
//     node_content_ref.value;
//     return (props.cell as Node).getData().gd.content ?? "";
//   },
//   set(value: string) {
//     node_content_ref.value = value;
//     (props.cell as Node).setData({ gd: { content: value } });
//   },
// });
//
// const node_variable_ref = ref("");
// const node_variable = computed({
//   get() {
//     node_variable_ref.value;
//     return ((props.cell as Node).getData() as AntvNodeData).gd.variable ?? "";
//   },
//   set(value: string) {
//     node_variable_ref.value = value;
//     (props.cell as Node).setData({
//       gd: { variable: value != "" ? value : null },
//     });
//   },
// });
//
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
