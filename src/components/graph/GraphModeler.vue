<template>
  <div class="overflow-hidden h-screen rounded-lg border border-slate-900/20 hover:shadow-sm hover:border-slate-900/30 transition ease-in-out">
    <div class="w-full bg-gray-100"></div>
    <div class="w-full h-screen flex">
      <div class="w-[25rem] flex-initial border-gray-300 border-r relative">
        <GraphModelerElementsBar v-if="graph !== null" :graph="graph" :graphNodes="graphNodes" :refreshComponent="refreshComponent" @createStage="createStage" @editStage="editStage" />
      </div>
      <div id="modeler-container-box" class="w-auto flex flex-grow border-b-0 border-gray-300/90" style="border-width: 3px">
        <div id="modeler-container" style="flex: 1"></div>
      </div>
      <div class="w-[25rem] flex-initial border-t border-gray-200 overflow-y-auto p-5">
        <GraphModelerConfigBar :cell="selected_cell" @saveNode="saveNode" @hideConfig="hideConfig" @deleteNode="deleteNode" @refresh-elemets-bar="renderAllNodes"></GraphModelerConfigBar>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue"

import { Cell, Graph, Node as AntvNode } from "@antv/x6"

// import { Node } from "@/utils/graph"

import GraphModelerConfigBar from "./GraphModelerConfigBar.vue"
import GraphModelerElementsBar from "./GraphModelerElementsBar.vue"

import { JSONGraphData } from "@/utils/transformer/json"

import { graph_options_defaults, graph_register_defaults, antvNodesGenerator, createEmptyNode } from "@/utils/antv-model"

import { ConfigAPI } from "@/api/config"
import { uuid } from "@/utils/data/uuid"

onMounted(async () => {
  renderAllNodes()
  initModeler()
})

const graphData: Ref<JSONGraphData> = ref({
  nodes: [
    {
      id: "9ed5d853-62a0-4395-afb9-d94e8cffd2cd",
      appearance: {
        x: 270,
        y: 40,
        width: 180,
        height: 36,
      },
      gd: {
        stageData: {
          checkNames: [],
          responsibleNames: [],
          watchersNames: [],
        },
        configData: [
          {
            type: "BaseInput",
            data: "Lorem ipsum dolor sit amet.",
          },
          {
            type: "BaseInput",
            data: "Lorem ipsum dolor sit amet.",
          },
        ],
        nodeConfig: {
          name: "Первый шаг",
          color: "#fff",
        },
      },
    },
    {
      id: "b8bdd58d-ab1f-44d0-82b8-5edb21f3d484",
      appearance: {
        x: 270,
        y: 110,
        width: 180,
        height: 36,
      },
      gd: {
        stageData: {
          checkNames: [],
          responsibleNames: [],
          watchersNames: [],
        },
        configData: [
          {
            type: "BaseInput",
            data: "Lorem ipsum dolor sit amet.",
          },
        ],
        nodeConfig: {
          name: "Второй шаг",
          color: "#fff",
        },
      },
    },
    {
      id: "396a3b5e-a0cd-49c4-96c3-c65a8da0c483",
      appearance: {
        x: 90,
        y: 190,
        width: 180,
        height: 36,
      },
      gd: {
        stageData: {
          checkNames: [],
          responsibleNames: [],
          watchersNames: [],
        },
        configData: [
          {
            type: "BaseInput",
            data: "Lorem ipsum dolor sit amet.",
          },
        ],
        nodeConfig: {
          name: "Третий шаг",
          color: "#fff",
        },
      },
    },
    {
      id: "d9a60522-cc80-40bf-b691-5e51b27b0e6c",
      appearance: {
        x: 90,
        y: 260,
        width: 180,
        height: 36,
      },
      gd: {
        stageData: {
          checkNames: [],
          responsibleNames: [],
          watchersNames: [],
        },
        configData: [
          {
            type: "BaseInput",
            data: "Lorem ipsum dolor sit amet.",
          },
        ],
        nodeConfig: {
          name: "Четвёртый шаг",
          color: "#fff",
        },
      },
    },
    {
      id: "20e3d21e-0799-4de7-8d1e-6cac260279ad",
      appearance: {
        x: 470,
        y: 260,
        width: 180,
        height: 36,
      },
      gd: {
        stageData: {
          checkNames: [],
          responsibleNames: [],
          watchersNames: [],
        },
        configData: [
          {
            type: "BaseInput",
            data: "Lorem ipsum dolor sit amet.",
          },
        ],
        nodeConfig: {
          name: "Пятый шаг",
          color: "#fff",
        },
      },
    },
  ],
  edges: [
    {
      id: "5106836e-d49c-4d33-9ed4-c6b5048ee11f",
      node_from_id: "b8bdd58d-ab1f-44d0-82b8-5edb21f3d484",
      node_to_id: "396a3b5e-a0cd-49c4-96c3-c65a8da0c483",
      gd: {
        content: "Yes",
      },
    },
    {
      id: "b81563a8-ad65-4d7e-86df-efbb0cf7fad4",
      node_from_id: "b8bdd58d-ab1f-44d0-82b8-5edb21f3d484",
      node_to_id: "20e3d21e-0799-4de7-8d1e-6cac260279ad",
      gd: {
        content: "No",
      },
    },
    {
      id: "3008df09-bacb-4a33-9b3e-8e248e858c2b",
      node_from_id: "396a3b5e-a0cd-49c4-96c3-c65a8da0c483",
      node_to_id: "d9a60522-cc80-40bf-b691-5e51b27b0e6c",
      gd: {
        content: null,
      },
    },
    {
      id: "90c865d8-fbc3-4b7b-b0a3-46a8f1468c3e",
      node_from_id: "9ed5d853-62a0-4395-afb9-d94e8cffd2cd",
      node_to_id: "b8bdd58d-ab1f-44d0-82b8-5edb21f3d484",
      gd: {
        content: null,
      },
    },
  ],
})

const graphNodes = ref([])

const graph: Ref<Graph | undefined> = ref()

const selected_cell = ref()

const registerEvents = (graph: Graph) => {
  graph.on("cell:selected", async ({ cell, options }) => {
    const res = await cell.data.promise

    const secondRes = await ConfigAPI.getNode(res.data.id)

    selected_cell.value = {
      id: cell.data.id,
      gd: {
        stageData: {
          checkNames: [],
          responsibleNames: [],
          watchersNames: [],
        },
        configData: secondRes.data.fields,
        nodeConfig: {
          name: cell.data.name,
          color: "#fff",
        },
        isConfigurable: true,
      },
    }
  })

  graph.on("cell:unselected", ({ cell, options }) => {
    if (selected_cell.value != null) selected_cell.value = undefined
  })

  graph.on("blank:click", ({ e, x, y }) => {
    if (selected_cell.value != null) selected_cell.value = undefined
  })
}

const initModeler = async () => {
  const container = document.getElementById("modeler-container")!

  graph.value = new Graph({
    ...graph_options_defaults,

    autoResize: true,
    container,
  })

  if (graph.value != undefined) {
    graph_register_defaults(graph.value)
    registerEvents(graph.value)

    const res = await ConfigAPI.getProject()
    let cells = []
    cells = res.data.steps.forEach((item) => {
      // graph.value.add_node({
      //   id: item.id,
      //   gd: item.nodeData.gd,
      //   appearance: {
      //     x: item.placement.x ?? 0,
      //     y: item.placement.y.y ?? 0,
      //     width: 180,
      //     height: 36,
      //     //   height: loc_node.getSize().height
      //     //       ?? node_types[loc_node_data.gd.type].antv_metadata.height,
      //   },
      // })
    })
  }
}

const createStage = () => {
  selected_cell.value = {
    id: uuid(),
    appearance: {
      x: 0,
      y: 0,
    },
    gd: {
      stageData: {
        checkNames: [],
        responsibleNames: [],
        watchersNames: [],
      },
      configData: [],
      nodeConfig: {
        name: "",
        color: "#fff",
      },
      isConfigurable: true,
    },
  }
}

const editStage = (cell: any) => {
  selected_cell.value = {
    id: cell.id,
    appearance: {
      x: 0,
      y: 0,
    },
    gd: {
      stageData: {
        checkNames: [],
        responsibleNames: [],
        watchersNames: [],
      },
      configData: cell.schema,
      nodeConfig: {
        name: cell.name,
        color: "#fff",
      },
      isConfigurable: true,
      isNew: true,
    },
  }
}

const renderAllNodes = async () => {
  const res = await ConfigAPI.getNodes()
  graphNodes.value = []
  graphNodes.value = res.data
}

const refreshComponent: Ref<boolean> = ref(false)

const saveNode = async (node: AntvNode) => {
  const nodeIndex = graphNodes.value.findIndex((item) => JSON.stringify(item) === JSON.stringify(node))
  if (nodeIndex !== -1) {
    graphNodes.value.splice(nodeIndex, 1, node)
    refreshComponent.value = !refreshComponent.value
  } else {
    //  await ConfigAPI.createNode({
    //    name: node.getData().nodeData.gd.nodeConfig.name,
    //    schema: {

    //    },
    //    example_metadata: {
    //      id: node.id,
    //      appearance: {
    //        x: node.position().x,
    //        y: node.position().y,
    //        width: 180,
    //        height: 36,
    //      },
    //      gd: node.getData().nodeData.gd,
    //    },
    //  })
    graphNodes.value.push(node)
  }
}

const hideConfig = () => {
  selected_cell.value = undefined
}

const deleteNode = (node: AntvNode) => {
  const nodeIndex = graphNodes.value.findIndex((item) => JSON.stringify(item) === JSON.stringify(node))
  if (nodeIndex !== -1) graphNodes.value.splice(nodeIndex, 1)
}

// const changeNode = (val: Partial<Node> & Pick<Node, "id" | "appearance" | "gd">) => {
//   graphData.value.nodes = graphData.value.nodes.map((item) => (item = item.id === val?.id ? val : item))

//   //   const resValue = { ...val }
//   //   resValue.nodeData.nodeConfig = val.nodeConfig
//   //   graphData.value.nodes = graphData.value.nodes.map((item) => (item = item.id === val?.nodeData.id ? resValue.nodeData : item))
// }
</script>

<style lang="scss">
.validation-error {
  span.clickable-entity {
    @apply font-mono text-sm;

    color: rgb(63, 19, 19);
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 4px;

    &:hover {
      // @apply text-black;
      text-decoration: initial;
    }
  }
}

.actions {
  @apply absolute top-0 right-0 m-2;
  @apply inline-flex self-center;

  button {
    @apply ml-2 px-2 py-0.5 rounded border bg-gray-100;
    @apply text-sm uppercase font-bold text-gray-600;

    &:disabled {
      @apply cursor-not-allowed bg-gray-200;
    }

    &:not([disabled]):hover {
      @apply ring-2 ring-gray-200 border-gray-300 cursor-pointer;
    }
  }
}

.svg-github {
  @apply relative top-0.5 fill-gray-400;
  width: 1.125rem;
  height: 1.125rem;

  &:hover {
    @apply fill-gray-700;
  }
}
</style>
