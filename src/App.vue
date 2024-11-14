<script lang="ts" setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
// import GraphModeler from "./components/graph/GraphModeler.vue"

const route = useRoute()
const getLayout = computed(() => (route.meta.layout ?? "default") + "-layout")
</script>

<template>
  <component :is="getLayout">
    <router-view />
  </component>
</template>

<style lang="scss"></style>
