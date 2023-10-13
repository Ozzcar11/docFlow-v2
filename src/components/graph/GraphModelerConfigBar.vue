<template>
  <template v-if="nodeData === undefined">
    <span class="block text-center opacity-30 text-xl mt-14">Выберите или создайте этап</span>
  </template>
  <template v-else-if="typeof props.cell.isEdge === 'function'">
    <el-button class="config-buttons text-gray-600" @click="deleteEdge" type="danger" plain>Удалить</el-button>
  </template>
  <template v-else>
    <div class="mb-4 flex justify-between">
      <el-button class="config-buttons text-gray-600" @click="deleteNode" type="danger" plain>Удалить</el-button>
      <div v-if="!nodeData.gd.isScheme">
        <el-button class="config-buttons text-gray-600" @click="hideConfigBar">Отмена</el-button>
        <el-button class="config-buttons text-white bg-blue-700" @click="saveNode">Сохранить</el-button>
      </div>
    </div>
    <BaseInput twClass="text-xl" class="mb-5" placeholder="Название" v-model="nodeData.gd.nodeConfig.name" />
    <div v-if="!nodeData.gd.isNew" class="grid grid-cols-2 gap-y-2 my-5">
      <div class="text-sm text-gray-600 flex items-center">Проверяющий</div>
      <BaseSelect v-model="nodeData.gd.stageData.checkNames" :options="users" />
      <div class="text-sm text-gray-600 flex items-center">Ответственный</div>
      <BaseSelect v-model="nodeData.gd.stageData.responsibleNames" :options="users" />
      <div class="text-sm text-gray-600 flex items-center">Наблюдатели</div>
      <BaseSelect v-model="nodeData.gd.stageData.watchersNames" multiple :options="users" />
    </div>
    <hr class="my-5" />
    <div v-for="(item, idx) in nodeData.gd.configData" :key="idx">
      <component :is="configComponents[item.component as keyof typeof configComponents]" v-model="item.data" :label="true" @deleteField="deleteField(item.id)"></component>
    </div>
    <div class="mt-4">
      <BaseSelectComponent @addComponent="addComponent" />
    </div>
  </template>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue"

import { ElMessage } from "element-plus"

import type { Node } from "@/utils/graph"

import { configComponents } from "@/utils/config-components"

import BaseInput from "../Base/BaseInput.vue"
import BaseSelect from "../Base/BaseSelect.vue"
import BaseSelectComponent from "../Base/BaseSelectComponent.vue"
import { ConfigAPI } from "@/api/config"

import { Graph } from "@antv/x6"
import { uuid } from "@/utils/data/uuid"
import { UsersAPI } from "@/api/users"
import fullName from "@/utils/data/fullName"
import { DepartmentsAPI } from "@/api/departments"
import { useRoute } from "vue-router"

const props = defineProps<{
  graph: Graph
  cell: any
}>()

const route = useRoute()

const nodeData = ref()

watch(
  () => props.cell,
  (value) => {
    nodeData.value = value
  },
)

onMounted(() => {
  getUsers()
})

const emits = defineEmits(["saveNode", "hideConfig", "deleteNode", "refreshElemetsBar"])

const getUsers = async () => {
  const { data } = await UsersAPI.getUsers()
  //   const res2 = await DepartmentsAPI.getDepartments()
  //   console.log(res2)

  users.value = data.map((item) => {
    return { value: item.id, label: fullName(item.first_name, item.last_name, item.middle_name) }
  })
}

const users = ref([
  {
    label: "Popular cities",
    options: [
      {
        value: "Shanghai",
        label: "Shanghai",
      },
      {
        value: "Beijing",
        label: "Beijing",
      },
    ],
  },
])

const addComponent = (component: string) => {
  nodeData.value?.gd.configData.push({
    component,
    data: "",
    id: uuid(),
  })
}

const hideConfigBar = () => {
  emits("hideConfig")
  nodeData.value = undefined
}

const deleteField = (value) => {
  nodeData.value.gd.configData = nodeData.value.gd.configData.filter((item) => item.id !== value)
  if (typeof value !== "string") {
    ConfigAPI.deleteField(value)
  }
}

const saveNode = async () => {
  if (nodeData.value.gd.configData.length === 0) {
    ElMessage.error("Создайте хотя-бы одно поле")
    return
  }
  nodeData.value.gd.configData = nodeData.value.gd.configData.map((item) => {
    if (typeof item.id === "string") {
      item.id = undefined
      return item
    } else return item
  })

  if (nodeData.value.gd.isNew) {
    const res = await ConfigAPI.createNode({
      name: nodeData.value.gd.nodeConfig.name,
      schema: nodeData.value.gd.configData,
    })
    emits("refreshElemetsBar")
    hideConfigBar()
    return
  }

  try {
    await ConfigAPI.changeNode(nodeData.value.id, {
      name: nodeData.value.gd.nodeConfig.name,
      fields: nodeData.value.gd.configData,
    })

    await ConfigAPI.setResponbleUsers(nodeData.value.id, {
      responsible_persons_scheme: {
        users_editor: nodeData.value.gd.stageData.checkNames,
        users_look: nodeData.value.gd.stageData.watchersNames,
        users_inspecting: nodeData.value.gd.stageData.responsibleNames,
      },
    })
  } catch (e) {
    ElMessage.error(`Произошла ошибка: ${e.message}`)
  }

  hideConfigBar()
}

const deleteNode = async () => {
  if (nodeData.value.gd.isScheme) {
    emits("deleteNode", props.cell)
    hideConfigBar()
    return
  }

  if (nodeData.value.gd.isNew) {
    hideConfigBar()
    return
  }

  if (props.cell.frontId) {
    props.graph.removeNode(props.cell.frontId)
    hideConfigBar()
    return
  } else {
    props.graph.removeNode(props.cell.id)
    hideConfigBar()
  }
}

const deleteEdge = async () => {
  props.graph.removeEdge(props.cell.id)
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
