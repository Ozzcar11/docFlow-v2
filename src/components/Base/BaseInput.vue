<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
   modelValue: string | number
}>()

</script>


<template>
   <div>
      <el-input :modelValue="modelValue" placeholder="" @input="$emit('update:modelValue', $event)"/>
   </div>
</template>


<style lang="scss">

</style>