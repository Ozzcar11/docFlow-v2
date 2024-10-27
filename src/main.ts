import App from './App.vue'
import ElementPlus from 'element-plus'
import Toast from "vue-toastification";
import { createApp } from 'vue'
import { router } from './router'
import { layouts } from './plugins/layouts';

import 'element-plus/dist/index.css'
import "vue-toastification/dist/index.css";

import './style/index.scss'

createApp(App)
  .use(ElementPlus)
  .use(router)
  .use(layouts)
  .use(Toast, { closeOnClick: false, draggable: false })
  .mount('#app')
