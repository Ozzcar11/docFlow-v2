<template>
   <div class="toolbar">
      <!-- <div class="toolbar-item">
            <button @click="item_save()"><i class="las la-cloud-upload-alt"></i>Save</button>
        </div> -->

      <!-- <div class="toolbar-item">
         <button :disabled="typeof graph === 'undefined'"
            @click="item_undo()">Отменить</button>
      </div>
      <div class="toolbar-item">
         <button :disabled="typeof graph === 'undefined'"
            @click="item_redo()">Вернуть</button>
      </div> -->
      <!--         
        <div class="toolbar-item">
            <button :disabled="typeof graph === 'undefined'" @click="item_clear()">Clear</button>
        </div>
        
        <div class="toolbar-item">
            <button :disabled="typeof graph === 'undefined'" @click="item_regenerate_docassemble()">Regenerate output</button>
        </div>
        
        <div class="toolbar-item">
            <button class="bg-blue-200" :disabled="typeof graph === 'undefined'" @click="modal_import.open()">Import</button>
        </div>
        
        <div class="toolbar-item">
            <button class="bg-blue-200" :disabled="typeof graph === 'undefined'" @click="item_load_example()">Load default example</button>
        </div> -->
   </div>
</template>

<script lang="ts" setup>
// https://github.com/antvis/X6/blob/master/sites/x6-sites-demos/packages/tutorial/basic/dnd/dnd/src/app.tsx

import { nextTick, Ref, ref } from 'vue';
import { Graph } from '@antv/x6';
import Transformer from '@/utils/transformer'
import { JSONGraphData } from '@/utils/transformer/json';
import { useToast } from 'vue-toastification';

import { Modal } from '@/utils/modal';

const toast = useToast();

/* Modal definitions */
const el_modal_import_text: Ref<HTMLElement | null> = ref(null);
const modal_import: Modal<{ text: string }> = new Modal({ text: '' }, {
   onOpen: () => {
      nextTick(() => {
         el_modal_import_text.value?.focus()
      })
   },
   onClose: () => modal_import.data.text = ""
});
const modal_import_file_changed = (event: Event) => {
   var reader = new FileReader();
   reader.onload = (ev) => {
      if ((ev.target?.result ?? false) && typeof ev.target?.result === 'string')
         modal_import.data.text = ev.target?.result;
   };
   const event_target = event.target as HTMLInputElement;
   if (event_target.files != null) {
      reader.readAsText(event_target.files[0]);
   }
}
const modal_import_import = () => {
   let import_cont = modal_import.data.text;

   if (import_cont.length == 0) {
      toast.error("No import data is empty")
      return;
   }

   // Step 1: find JSON by boundary.
   // Step 2: if boundary not exists, assume whole is JSON.
   // Boundary requirements:
   // Format: [START INLINE GRAPHDOC EXPORT]...{CONTENT}...[END INLINE GRAPHDOC EXPORT]
   //  - The dots represent any 5 characters before encountering the accolades (for matching next to comments).
   //  - Regex: /\[START INLINE GRAPHDOC EXPORT\].{0,5}(\{.*\}).{0,5}?\[END INLINE GRAPHDOC EXPORT\]/s

   const boundary_result = import_cont.match(/\[START INLINE GRAPHDOC EXPORT\].{0,5}(\{.*\}).{0,5}?\[END INLINE GRAPHDOC EXPORT\]/s);
   if (boundary_result && boundary_result[1]) {
      import_cont = boundary_result[1];
   }

   let import_json: object = {};
   try {
      import_json = JSON.parse(import_cont);
      if (!import_json)
         throw Error(); // to trigger same exception
   } catch (e) {
      toast.error("Data does not contain valid JSON, or does not contain the GraphDoc boundary specifier.")
      // modal_import.data.error = "Data does not contain valid JSON, or does not contain the GraphDoc boundary specifier."
      return;
   }

   if (!Object.hasOwnProperty.call(import_json, "main") ||
      !Object.hasOwnProperty.call(import_json, "nodes") ||
      !Object.hasOwnProperty.call(import_json, "edges")) {
      toast.error("Data does not include one of the required properties: 'main', 'nodes' or 'edges'.");
      // modal_import.data.error = "Data does not include one of the required properties: 'main', 'nodes' or 'edges'."
      return;
   }

   const antv = (new Transformer()).in_json(import_json as JSONGraphData).out_antv();

   props.graph?.fromJSON(antv);
   props.docassemble_cont_update!();

   toast.success("Imported")
   modal_import.close();
}

const props = defineProps({
   graph: {
      type: Graph,
   },
   docassemble_cont_update: {
      type: Function,
   },
   init_modeler: {
      type: Function,
   }
})

const item_regenerate_docassemble = () => {
   props.docassemble_cont_update!()
}

const item_load_example = () => {
   // props.docassemble_cont_update!()
   if (confirm("Are you sure you want to load the example flowchart?")) {
      // const json: JSONGraphData = { "nodes": [{ "id": "9ed5d853-62a0-4395-afb9-d94e8cffd2cd", "appearance": { "x": 270, "y": 40, "width": 180, "height": 36 }, "gd": { "type": "start", "content": "walk or bus?", "variable": "walk_or_bus" } }, { "id": "b8bdd58d-ab1f-44d0-82b8-5edb21f3d484", "appearance": { "x": 270, "y": 110, "width": 180, "height": 36 }, "gd": { "type": "decision", "content": "is it raining?", "variable": "is_raining" } }, { "id": "396a3b5e-a0cd-49c4-96c3-c65a8da0c483", "appearance": { "x": 90, "y": 190, "width": 180, "height": 36 }, "gd": { "type": "notice", "content": "take an umbrella", "variable": "notice_take_umbrella" } }, { "id": "d9a60522-cc80-40bf-b691-5e51b27b0e6c", "appearance": { "x": 90, "y": 260, "width": 180, "height": 36 }, "gd": { "type": "end", "content": "take the bus", "variable": "end_bus" } }, { "id": "20e3d21e-0799-4de7-8d1e-6cac260279ad", "appearance": { "x": 470, "y": 260, "width": 180, "height": 36 }, "gd": { "type": "end", "content": "take a walk", "variable": "end_walk" } }], "edges": [{ "id": "5106836e-d49c-4d33-9ed4-c6b5048ee11f", "node_from_id": "b8bdd58d-ab1f-44d0-82b8-5edb21f3d484", "node_to_id": "396a3b5e-a0cd-49c4-96c3-c65a8da0c483", "gd": { "content": "Yes" } }, { "id": "b81563a8-ad65-4d7e-86df-efbb0cf7fad4", "node_from_id": "b8bdd58d-ab1f-44d0-82b8-5edb21f3d484", "node_to_id": "20e3d21e-0799-4de7-8d1e-6cac260279ad", "gd": { "content": "No" } }, { "id": "3008df09-bacb-4a33-9b3e-8e248e858c2b", "node_from_id": "396a3b5e-a0cd-49c4-96c3-c65a8da0c483", "node_to_id": "d9a60522-cc80-40bf-b691-5e51b27b0e6c", "gd": { "content": null } }, { "id": "90c865d8-fbc3-4b7b-b0a3-46a8f1468c3e", "node_from_id": "9ed5d853-62a0-4395-afb9-d94e8cffd2cd", "node_to_id": "b8bdd58d-ab1f-44d0-82b8-5edb21f3d484", "gd": { "content": null } }], "main": { "name": "Untitled graph" } };
      // const antv = (new Transformer()).in_json(json).out_antv();
      // props.graph?.fromJSON(antv);
      // props.docassemble_cont_update!();
   }
}

const item_use = () => {
   // window.open(route('graph.show', [this.remote_graph_data.graph.id]), '_blank');
}

const item_reload = () => {
   // props.remote_graph_data_reload()
}

const item_save = () => {
   // props.local_save()
}

const item_undo = () => {
   props.graph?.undo();
}

const item_redo = () => {
   props.graph?.redo();
}

const item_clear = () => {
   // if (typeof props.init_modeler !== "undefined" && confirm("Are you sure you want to reset your workspace?")){
   //     props.init_modeler();
   // }

   if (confirm("Are you sure you want to reset your workspace?")) {
      props.graph?.removeCells(props.graph.getCells());
      // TODO: set view to original state
   }
}

</script>

<style lang="scss">
.toolbar {

   @apply flex p-2;

   .toolbar-item button {

      &[disabled] {
         @apply bg-gray-300 cursor-not-allowed;
      }

      @apply bg-white border border-gray-300 text-gray-800 px-3 py-1 mr-2 rounded-md flex items-center font-normal;

      i {
         @apply mr-2 text-lg leading-none;
      }

      &:hover {
         @apply ring-4 ring-gray-200 border-gray-400 cursor-pointer;
      }
   }

}</style>
