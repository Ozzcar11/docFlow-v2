import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import './style/index.scss'

createApp(App)
    .use(ElementPlus)
    .use(Toast, {closeOnClick: false, draggable: false})
    .mount('#app')
