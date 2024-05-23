import { createApp } from 'vue'
import App from './App.vue'

import { router } from './routers/index.js' // router
import store from "./stores/index.js"; // state

import Vue3Toastify from "vue3-toastify";

import { setupCalendar, Calendar, DatePicker } from "v-calendar";
import 'v-calendar/dist/style.css';

const app = createApp(App);

app.use(router)
    .use(store)
    .use(Vue3Toastify, { autoClose: 3000, })
    .mount('#app')

app.component('VDatePicker', DatePicker)
