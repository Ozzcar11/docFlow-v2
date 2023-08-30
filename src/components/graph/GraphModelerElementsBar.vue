<template>
  <div class="shape-holder">
    <div class="mb-7 text-lg font-medium">Этапы</div>
    <div v-for="node of graphData.nodes" :key="node.id" :data-id="node.id" class="node" @mousedown="startDrag($event)">
      {{ node.gd.nodeConfig.name ?? "Новый элемент" }}
    </div>
    <div class="mt-auto"></div>
  </div>
  <div class="absolute bottom-0 w-full h-28 px-10 py-8 border-t bg-white">
    <button class="flex w-full py-4 rounded-2xl justify-center border border-gray-300">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      <span class="ml-2">Создать новый этап</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { Addon, Graph } from "@antv/x6"
import { Dnd } from "@antv/x6/lib/addon/dnd"

import { onMounted, Ref, ref, watch } from "vue"
import { antvMetadata } from "@/utils/antv-model"
import { JSONGraphData } from "@/utils/transformer/json"

const props = defineProps<{
  graph: Graph | undefined
  graphData: JSONGraphData
}>()

const dnd: Ref<Dnd | undefined> = ref()

onMounted(() => {
  // console.log(dnd.value);
})

watch(
  () => props.graph,
  (value: typeof props.graph) => {
    if (typeof value !== "undefined") init_dnd(value)
  },
)

const init_dnd = (graph: Graph) => {
  dnd.value = new Addon.Dnd({
    target: graph,
    scaled: false,
    animation: true,
    validateNode(droppingNode) {
      droppingNode.updateData({ is_stencil_node: undefined })
      return true
    },
  })
}

const startDrag = (e: MouseEvent) => {
  if (typeof props.graph == "undefined") return false

  const target = e.currentTarget as HTMLElement

  const nodeData = props.graphData.nodes.find((item) => item.id === target.dataset.id)
  const node = props.graph.createNode(antvMetadata(nodeData))

  //   delete nodeData?.nodeConfig

  node.setData({ is_stencil_node: true, nodeData })

  dnd.value?.start(node, e)
}
</script>

<style lang="scss">
.shape-holder {
  user-select: none;
  @apply my-5 mx-10;

  height: calc(100vh - 112px);
  overflow-y: auto;

  .shape {
    @apply mb-1 p-2 bg-gray-200 border-gray-300 border-b-2 border-t;
  }

  .node {
    // @apply cursor-move text-gray-800 mx-1 mb-2 py-1.5 w-0;
    @apply cursor-move my-2.5 px-10 py-7 rounded-2xl justify-center h-20 text-center;

    width: initial;
    &:hover {
      @apply text-gray-900;
    }
  }
}
</style>
