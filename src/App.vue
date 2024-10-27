<script lang="ts" setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
// import GraphModeler from "./components/graph/GraphModeler.vue"

const route = useRoute()
const getLayout = computed(() => (route.meta.layout ?? "default") + "-layout")
</script>

<template>
  <div class="min-h-screen">
    {{ getLayout }}
    <component :is="getLayout">
      <router-view />
    </component>
  </div>
</template>

<style lang="scss"></style>
