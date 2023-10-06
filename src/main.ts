import { createApp } from "vue"

import ElementPlus from "element-plus"
import App from "./App.vue"

import Toast from "vue-toastification"

import "vue-toastification/dist/index.css"

import router from "@/view/router"

createApp(App).use(router).use(ElementPlus).use(Toast, { closeOnClick: false, draggable: false }).mount("#app")
