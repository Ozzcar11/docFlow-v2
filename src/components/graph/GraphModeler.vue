<template>
   <div
      class="overflow-hidden h-screen rounded-lg border border-slate-900/20 hover:shadow-sm hover:border-slate-900/30 transition ease-in-out">
      <div class="w-full bg-gray-100">
            <GraphModelerToolbar
                :graph="graph" 
                :docassemble_cont_update="docassemble_cont_update"
                :init_modeler="init_modeler"
                 />
        </div>
      <div class="w-full h-screen flex">
         <div class="w-30 flex-initial bg-gray-100 border-t  border-gray-200">
            <GraphModelerElementsBar v-if="graph !== null"
               :graph="graph"></GraphModelerElementsBar>
         </div>
         <div id="modeler-container-box"
            class="flex flex-grow border-b-0 border-gray-300/90"
            style="border-width: 3px;">
            <div id="modeler-container"
               style="flex: 1"></div>
         </div>
         <div class="w-64 flex-initial bg-gray-100 border-t border-gray-200 overflow-y-auto">
            <GraphModelerConfigBar :cell="selected_cell"></GraphModelerConfigBar>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>

import { h, onMounted, reactive, Ref, ref, VNode, watch } from 'vue';

import { useToast } from "vue-toastification";

import { Cell, Graph } from '@antv/x6';

import GraphModelerConfigBar from './GraphModelerConfigBar.vue'
import GraphModelerElementsBar from './GraphModelerElementsBar.vue'
import GraphModelerToolbar from './GraphModelerToolbar.vue'
import GraphValidationErrors from './GraphValidationErrors.vue'

import Transformer from '@/utils/transformer'
import { graph_options_defaults, graph_register_defaults } from '@/utils/antv-model'
import { DocassembleTransformer, validationErrorList } from '@/utils/transformer/docassemble';
import { Node, Edge } from '@/utils/graph';

import { download } from '@/utils/data/download';

const read_more = ref(false);

onMounted(() => {
   init_modeler()
   docassemble_cont_update()
})

const graph_data: Ref<object> = ref({});
const graph: Ref<Graph | undefined> = ref();

const selected_cell: Ref<Cell | undefined> = ref();
function select_cell(cell: Cell | undefined) {
   if (typeof cell !== 'undefined') {
      selected_cell.value = cell;
      graph.value?.select(cell);
      graph.value?.scrollToCell(cell);
   }
}

const docassemble_validation_errors: Ref<validationErrorList> = ref([]);
const formatted_validation_errors: Ref<(string | VNode)[][]> = ref([]);
const docassemble_cont: Ref<string> = ref('');

const docassemble_out_options = reactive({
   include_json_export: true,
});

watch(() => docassemble_out_options, (val => {
   // console.log("options updated")
   docassemble_cont_update();
}), { deep: true })

const docassemble_cont_update = () => {
   if (typeof graph.value == "undefined")
      return;

   const transformer = (new Transformer()).in_antv(graph.value);

   docassemble_validation_errors.value = (new DocassembleTransformer()).validate_graph(transformer.graph);
   // remove cells from all errors
   graph.value.getCells().forEach(cell =>
      typeof cell.getData()?.errors !== 'undefined' &&
      cell.setData({ 'errors': false }, { no_da_update: true }));

   // this part formats the conversion errors, which contain Node and Edge 
   // objects, to a clickable span as a VNode
   formatted_validation_errors.value = docassemble_validation_errors.value.map((val_error) => {
      return val_error.map(error_part => {
         if (typeof error_part === "string") {
            return error_part;
         } else if (error_part.is_node()) {
            const error_node = (error_part as Node);
            const antv_node = graph.value?.getCellById(error_node.id);
            if (typeof antv_node !== 'undefined') {
               antv_node.setData({ errors: true }, { no_da_update: true });
               return h('span', {
                  onClick() {
                     select_cell(antv_node);
                  },
                  class: 'clickable-entity'
               }, error_node.get_variable());
            } else {
               return `"${error_node.get_variable()}""`
            }
         } else if (error_part.is_edge()) {
            const error_edge = (error_part as Edge);
            const antv_edge = graph.value?.getCellById(error_edge.id);
            const error_edge_content = error_edge.gd.content ?
               `with content ${error_edge.gd.content}` :
               `leaving from node ${error_edge.get_node_from().get_label()}`;
            if (typeof antv_edge !== 'undefined') {
               return h('span', {
                  onClick() {
                     select_cell(graph.value?.getCellById(error_edge.gd.content ? error_edge.id : error_edge.node_from_id));
                  },
                  class: 'clickable-entity'
               }, error_edge_content);
            } else {
               return `"${error_edge_content}"`
            }
         } else {
            return ''
         }
      });
   });

   if (formatted_validation_errors.value.length == 0) {
      docassemble_cont.value = transformer.out_docassemble()
      if (docassemble_cont.value && docassemble_out_options.include_json_export) {
         docassemble_cont.value = docassemble_cont.value
            .concat("\n---\n# [START INLINE GRAPHDOC EXPORT]")
            .concat("\n# ").concat(JSON.stringify(transformer.out_json()))
            .concat("\n# [END INLINE GRAPHDOC EXPORT]");
      }
   } else {
      docassemble_cont.value = '-';
   }
};

const copy_button_content = ref('COPY');
const copy_docassemble_out = () => {

   const el_docassemble_out_container = document.getElementById('docassemble_out_container');
   if (el_docassemble_out_container) {
      (window as Window).getSelection()?.selectAllChildren(el_docassemble_out_container);

      // source: https://stackoverflow.com/a/67008779/17864167
      navigator.clipboard.writeText(docassemble_cont.value)
         .then(() => {
            copy_button_content.value = 'COPIED!';
            setTimeout(() => { copy_button_content.value = 'COPY' }, 1200)
         })
         .catch(err => {
            copy_button_content.value = 'FAILED';
            setTimeout(() => { copy_button_content.value = 'COPY' }, 1200)
            console.log('Failed to copy', err);
         });
   }
}
const download_docassemble_out = () => {
   download("interview.yml", docassemble_cont.value)
}

const register_events = (graph: Graph) => {
   // https://x6.antv.vision/en/docs/tutorial/intermediate/events

   graph.on('cell:change:*', (args) => {
      // console.log(args)
      if (!(args.options.no_da_update ?? false)) {
         if (args.key == 'target') {
            // when target hits, it changes from {x: n, y: n} to Cell, which we will catch here.
            if (typeof args.current.cell != typeof args.previous.cell)
               docassemble_cont_update()

            // other changes to ignore:
         } else if (!['target', 'zIndex', 'tools', 'position'].includes(args.key as string))
            docassemble_cont_update()
      }
   })

   graph.on('node:moved', docassemble_cont_update)

   graph.on('cell:removed', docassemble_cont_update)
   graph.on('cell:added', docassemble_cont_update)

   graph.on('cell:selected', ({ cell, options }) => {
      if (selected_cell.value != cell)
         selected_cell.value = cell
   })

   graph.on('cell:unselected', ({ cell, options }) => {
      if (selected_cell.value != null)
         selected_cell.value = undefined
   })

   graph.on('blank:click', ({ e, x, y }) => {
      if (selected_cell.value != null)
         selected_cell.value = undefined
   })
}

const init_modeler = () => {

   const container = document.getElementById('modeler-container')!;

   graph.value = new Graph({
      ...graph_options_defaults,

      container: container,
      autoResize: true,
   })


   if (graph.value != undefined) {
      graph_register_defaults(graph.value);
      register_events(graph.value);

      docassemble_cont_update()
   }

};

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
         @apply ring-2 ring-gray-200 border-gray-300 cursor-pointer
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