import { createApp } from 'vue'
import App from './App.vue'

import { router } from './routers/index.js'
import store from "./stores/index.js";

const app
	= createApp(App)
	.use(router)
	.use(store)
	.mount('#app');
