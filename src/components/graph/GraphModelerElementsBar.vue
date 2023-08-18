<template>
  <div class="shape-holder">
    <!--         
        <div class="shape" data-type="start" @mousedown="startDrag($event)">
            Start
        </div>
        <div class="shape" data-type="decision" @mousedown="startDrag($event)">
            Decision
        </div>
        <div class="shape" data-type="notice" @mousedown="startDrag($event)">
            Notice
        </div>
        <div class="shape" data-type="end" @mousedown="startDrag($event)">
            End
        </div> 
        -->
    <!-- Цикл по нодам из graph -->
    <div v-for="node of graphData.nodes" :key="node.id" :data-id="node.id" class="node" @mousedown="startDrag($event)">
      {{ node.nodeConfig?.name }}
      <!-- {{ node.nodeConfig?.name || "Новый элемент" }} -->
    </div>
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
  margin-top: 2rem;

  .shape {
    @apply mb-1 p-2 bg-gray-200 border-gray-300 border-b-2 border-t;
  }

  .node {
    // @apply cursor-move text-gray-800 mx-1 mb-2 py-1.5 w-0;
    @apply cursor-move text-gray-600 mb-2;

    width: initial;
    padding: 0.375rem 0.5rem;

    border-radius: 0;
    border-left: 0;
    border-right: 0;

    &:hover {
      @apply text-gray-900;
    }
  }
}
</style>
