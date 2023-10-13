import { createApp } from "vue"
import { createPinia } from "pinia"

import ElementPlus from "element-plus"
import App from "./App.vue"

const pinia = createPinia()
import "element-plus/dist/index.css"

import router from "@/view/router"

createApp(App).use(router).use(ElementPlus).use(pinia).mount("#app")
