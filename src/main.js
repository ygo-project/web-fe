import { createApp } from 'vue'
import App from './App.vue'

import { router } from './routers/index.js' // router
import store from "./stores/index.js"; // state
import Vue3Toastify from "vue3-toastify";

const app = createApp(App);

app.use(router)
    .use(store)
    .use(Vue3Toastify, { autoClose: 3000, })
    .mount('#app')
