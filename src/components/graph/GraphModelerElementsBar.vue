<template>
  <div class="shape-holder">
    <div class="mb-7 text-lg font-medium">Этапы</div>
    <template v-if="renderComponent">
      <div v-for="node of graphNodes" :key="node.id" :data-id="node.id" class="node" @mousedown="startDrag($event)">
        {{ node.data.nodeData.gd.nodeConfig.name ?? "Новый элемент" }}
        <button class="absolute right-4" id="edit">
          <EditIcon class="pointer-events-none" />
        </button>
      </div>
    </template>
    <!-- <div ref="stencilContainer" class="stencil-container"></div> -->
    <div class="mt-auto"></div>
  </div>
  <div class="absolute bottom-0 w-full h-28 px-10 py-8 border-t bg-white">
    <button class="flex w-full py-4 rounded-2xl justify-center border border-gray-300" @click="$emit('createStage')">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      <span class="ml-2">Создать новый этап</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import EditIcon from "@/assets/icons/EditIcon.vue"

import { Addon, Graph, Node as AntvNode } from "@antv/x6"
import { Dnd } from "@antv/x6/lib/addon/dnd"
// import { Stencil } from "@antv/x6/lib/addon/stencil"

import { onMounted, Ref, ref, watch, nextTick } from "vue"
// import { antvMetadata } from "@/utils/antv-model"

const props = defineProps<{
  graph: Graph | undefined
  graphNodes: AntvNode[]
  refreshComponent: boolean
}>()

const emit = defineEmits(["createStage", "editStage"])

const dnd: Ref<Dnd | undefined> = ref()
// const stencil: Ref<Stencil | undefined> = ref()
// const stencilContainer: Ref<HTMLDivElement | undefined> = ref()

onMounted(() => {
  // console.log(dnd.value);
})

watch(
  () => props.graph,
  (value: typeof props.graph) => {
    if (typeof value !== "undefined") {
      initDnd(value)
      // initStencil(value)
    }
  },
)

watch(
  () => props.refreshComponent,
  () => {
    forceRender()
  },
)

const renderComponent = ref(true)

const forceRender = async () => {
  renderComponent.value = false

  await nextTick()

  renderComponent.value = true
}

// const initStencil = (graph: Graph) => {
//   stencil.value = new Addon.Stencil({
//     title: "Этапы",
//     target: graph,
//     stencilGraphWidth: 400,
//     stencilGraphHeight: 800,
//   })
//   stencilContainer.value?.appendChild(stencil.value.container)
//   stencil.value.load(props.graphNodes)
// }

const initDnd = (graph: Graph) => {
  dnd.value = new Addon.Dnd({
    target: graph,
    scaled: false,
    animation: true,
  })
}

const startDrag = (e: MouseEvent) => {
  if (typeof props.graph == "undefined") return false

  const target = e.currentTarget as HTMLElement

  const node = props.graphNodes.find((item) => item.id === target.dataset.id)

  if ((e.target as HTMLElement).id === "edit") {
    emit("editStage", node)
  } else {
    dnd.value?.start(node!, e)
  }
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
    @apply relative cursor-move my-2.5 px-10 py-7 rounded-2xl justify-center h-20 text-center;

    width: initial;
    &:hover {
      @apply text-gray-900;
    }
  }
}
</style>
